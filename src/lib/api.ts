// リフレッシュ処理の重複を防ぐためのPromise
let refreshPromise: Promise<boolean> | null = null

// API呼び出し用のfetchラッパー
export const apiClient = {
  async request<T = any>(
    endpoint: string,
    options: RequestInit = {},
    skipRefresh = false
  ): Promise<T> {
    // Use absolute URL in production, relative in development
    const baseUrl = import.meta.env.MODE === 'production' 
      ? `${import.meta.env.VITE_API_TARGET}/api`
      : '/api'
    
    const url = endpoint.startsWith('http') ? endpoint : `${baseUrl}${endpoint}`
    
    const config: RequestInit = {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)
      
      // 401エラーの場合は認証が必要
      if (response.status === 401 && !skipRefresh) {
        // リフレッシュトークンで再試行
        const refreshed = await this.refreshToken()
        if (refreshed) {
          // リフレッシュ成功、元のリクエストを再実行
          return this.request<T>(endpoint, options, true)
        } else {
          // リフレッシュ失敗、ログアウト処理
          await this.handleAuthFailure()
          throw new Error('Unauthorized')
        }
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || 'API request failed')
      }

      // レスポンスがJSONでない場合もある
      const contentType = response.headers.get('content-type')
      if (contentType && contentType.includes('application/json')) {
        return await response.json()
      }
      
      return response as T
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  },

  async refreshToken(): Promise<boolean> {
    // 既にリフレッシュ処理中の場合は、その結果を待つ
    if (refreshPromise) {
      return refreshPromise
    }

    refreshPromise = this.executeRefresh()
    try {
      return await refreshPromise
    } finally {
      refreshPromise = null
    }
  },

  async executeRefresh(): Promise<boolean> {
    try {
      // Use absolute URL in production, relative in development
      const baseUrl = import.meta.env.MODE === 'production' 
        ? `${import.meta.env.VITE_API_TARGET}/api`
        : '/api'
      
      const response = await fetch(`${baseUrl}/refresh`, {
        method: 'POST',
        credentials: 'include',
      })

      if (response.ok) {
        console.log('Token refreshed successfully')
        return true
      } else {
        console.log('Token refresh failed')
        return false
      }
    } catch (error) {
      console.error('Token refresh error:', error)
      return false
    }
  },

  async handleAuthFailure(): Promise<void> {
    // 認証失敗時の処理（ログアウトとリダイレクト）
    try {
      // Use absolute URL in production, relative in development
      const baseUrl = import.meta.env.MODE === 'production' 
        ? `${import.meta.env.VITE_API_TARGET}/api`
        : '/api'
      
      // サーバー側のセッションクリア
      await fetch(`${baseUrl}/logout`, {
        method: 'POST',
        credentials: 'include',
      }).catch(() => {
        // ログアウトAPIが失敗してもクライアント側は続行
      })
    } finally {
      // ログイン画面にリダイレクト
      // window.location.href = '/sign-in'
    }
  },

  // GET request
  async get<T = any>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' })
  },

  // POST request
  async post<T = any>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    })
  },

  // PUT request
  async put<T = any>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    })
  },

  // DELETE request
  async delete<T = any>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' })
  },
}

// 認証関連のAPI
export const authApi = {
  async login(email: string, password: string) {
    return apiClient.post('/login', { email, password })
  },

  async logout() {
    return apiClient.post('/logout')
  },

  async getCurrentUser() {
    return apiClient.get('/me')
  },

  async refresh() {
    return apiClient.post('/refresh')
  },
}