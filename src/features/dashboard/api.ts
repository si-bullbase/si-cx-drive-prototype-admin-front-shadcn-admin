import type { DashboardData } from './types'
import { mockDashboardData } from './mock-data'

const API_BASE_URL = '/api'

// Check if we should use mock data instead of API
const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true' || import.meta.env.DEV

export async function fetchDashboardSummary(): Promise<DashboardData> {
  // If mock data is enabled, return mock data immediately
  if (USE_MOCK_DATA && !import.meta.env.VITE_FORCE_API) {
    // Add small delay to simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    return mockDashboardData
  }

  try {
    console.log('Fetching dashboard summary from:', `${API_BASE_URL}/dashboard/summary/`)
    
    // Check if we're in development and API server might not be running
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout for faster fallback
    
    const response = await fetch(`${API_BASE_URL}/dashboard/summary/`, {
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
    
    console.log('Response status:', response.status)
    console.log('Response headers:', Object.fromEntries(response.headers.entries()))
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('Error response body:', errorText)
      throw new Error(`API request failed: ${response.status} - ${errorText}`)
    }
    
    const data: DashboardData = await response.json()
    console.log('Dashboard data received:', data)
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