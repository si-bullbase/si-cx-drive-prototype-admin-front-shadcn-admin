import type { DashboardData } from './types'
import { mockDashboardData } from './mock-data'

const API_BASE_URL = '/api' 

// Check if we should use mock data instead of API
const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true'

export async function fetchDashboardSummary(): Promise<DashboardData> {
  // If mock data is enabled, return mock data immediately
  if (USE_MOCK_DATA && !import.meta.env.VITE_FORCE_API) {
    // Add small delay to simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    return mockDashboardData
  }

  try {
    const url = `${API_BASE_URL}/dashboard/summary`
    console.log('🔍 Dashboard - Fetching dashboard summary from:', url)
    console.log('🔍 Dashboard - API_BASE_URL:', API_BASE_URL)
    console.log('🔍 Dashboard - Environment check:', {
      VITE_API_TARGET: import.meta.env.VITE_API_TARGET,
      NODE_ENV: import.meta.env.NODE_ENV,
      MODE: import.meta.env.MODE,
      USE_MOCK_DATA,
      VITE_FORCE_API: import.meta.env.VITE_FORCE_API
    })
    
    // Check if we're in development and API server might not be running
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout for faster fallback
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
      // Add credentials if needed for CORS
      credentials: 'same-origin'
    })
    
    clearTimeout(timeoutId)
    
    console.log('🔍 Dashboard - Response status:', response.status)
    console.log('🔍 Dashboard - Response headers:', Object.fromEntries(response.headers.entries()))
    console.log('🔍 Dashboard - Response URL:', response.url)
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('🚨 Dashboard - Error response body:', errorText)
      
      // Check if response is HTML (indicating an error page)
      if (errorText.trim().startsWith('<!')) {
        console.error('🚨 Dashboard - Received HTML instead of JSON:', errorText.substring(0, 500))
        throw new Error('API returned HTML instead of JSON')
      }
      
      throw new Error(`API request failed: ${response.status} - ${errorText}`)
    }
    
    const text = await response.text()
    console.log('🔍 Dashboard - Response text (first 200 chars):', text.substring(0, 200))
    
    // Check if response is HTML (indicating an error page)
    if (text.trim().startsWith('<!')) {
      console.error('🚨 Dashboard - Received HTML instead of JSON:', text.substring(0, 500))
      throw new Error('API returned HTML instead of JSON')
    }
    
    const data: DashboardData = JSON.parse(text)
    console.log('✅ Dashboard - Successfully parsed JSON data:', data)
    return data
  } catch (error) {
    // Handle different types of network errors with more specific messages
    if (error instanceof DOMException && error.name === 'AbortError') {
      console.warn('API request timed out after 5 seconds. Using fallback data.')
      throw new Error('API request timed out - using mock data')
    }
    if (error instanceof TypeError && (error.message.includes('Failed to fetch') || error.message.includes('fetch'))) {
      console.warn('Network error: Unable to connect to API server (CORS or connection issue). Using fallback data.')
      throw new Error('API server connection failed - using mock data')
    }
    console.error('Dashboard API error:', error)
    throw new Error(`API error: ${error instanceof Error ? error.message : 'Unknown error'} - using mock data`)
  }
}