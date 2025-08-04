import type { DashboardData } from './types'

const API_BASE_URL = '/api'

export async function fetchDashboardSummary(): Promise<DashboardData> {
  try {
    console.log('Fetching dashboard summary from:', `${API_BASE_URL}/dashboard/summary/`)
    const response = await fetch(`${API_BASE_URL}/dashboard/summary/`)
    
    console.log('Response status:', response.status)
    console.log('Response headers:', Object.fromEntries(response.headers.entries()))
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('Error response body:', errorText)
      throw new Error(`Failed to fetch dashboard summary: ${response.status} - ${errorText}`)
    }
    
    const data: DashboardData = await response.json()
    console.log('Dashboard data received:', data)
    return data
  } catch (error) {
    console.error('Dashboard API error:', error)
    throw error
  }
}