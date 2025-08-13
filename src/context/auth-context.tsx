import { createContext, useContext, useEffect, useState } from 'react'
import { authApi } from '@/lib/api'
import { useAuthStore } from '@/stores/authStore'

type User = {
  id: string
  email: string
  name?: string
}

type AuthProviderProps = {
  children: React.ReactNode
}

type AuthProviderState = {
  user: User | null
  login: () => Promise<void>
  logout: () => Promise<void>
  refreshAuth: () => Promise<boolean>
  isAuthenticated: boolean
  isLoading: boolean
}

const initialState: AuthProviderState = {
  user: null,
  login: async () => {},
  logout: async () => {},
  refreshAuth: async () => false,
  isAuthenticated: false,
  isLoading: true,
}

const AuthProviderContext = createContext<AuthProviderState>(initialState)

export function AuthProvider({ children, ...props }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const authStore = useAuthStore()

  // 現在のユーザー情報を取得する関数
  const fetchCurrentUser = async () => {
    try {
      const userData = await authApi.getCurrentUser()
      setUser(userData)
      return true
    } catch (error) {
      console.error('Failed to fetch user:', error)
      setUser(null)
      return false
    }
  }

  // 初期化時にユーザー情報を確認
  useEffect(() => {
    const initializeAuth = async () => {
      await fetchCurrentUser()
      setIsLoading(false)
    }
    initializeAuth()
  }, [])

  const login = async () => {
    // ログイン処理後にユーザー情報を再取得
    await fetchCurrentUser()
  }

  const logout = async () => {
    try {
      await authApi.logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      // サーバー側でエラーが発生してもクライアント側の状態はクリア
      setUser(null)
      authStore.auth.reset()
    }
  }

  const refreshAuth = async (): Promise<boolean> => {
    try {
      await authApi.refresh()
      await fetchCurrentUser()
      return true
    } catch (error) {
      console.error('Auth refresh failed:', error)
      setUser(null)
      return false
    }
  }

  const value = {
    user,
    login,
    logout,
    refreshAuth,
    isAuthenticated: !!user,
    isLoading,
  }

  return (
    <AuthProviderContext.Provider {...props} value={value}>
      {children}
    </AuthProviderContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthProviderContext)

  if (context === undefined)
    throw new Error('useAuth must be used within an AuthProvider')

  return context
}