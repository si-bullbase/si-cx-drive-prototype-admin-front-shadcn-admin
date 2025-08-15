import type { SnsSuggestItem, SnsSuggestApiResponse, ApiSnsSuggestItem } from './types'

const API_BASE_URL = '/api'

function transformApiItemToSnsSuggestItem(apiItem: ApiSnsSuggestItem): SnsSuggestItem {
  const targetMap: Record<string, string> = {
    'Executive': '経営者・役員',
    'マーケティング担当者、営業部門の関係者': 'マーケティング'
  }

  return {
    id: apiItem.id,
    platform: apiItem.platform,
    keywords: apiItem.keyword,
    content: apiItem.content,
    target: targetMap[apiItem.target] || apiItem.target,
    engagement: {
      rate: `${((apiItem.engagement.engagement_rate ?? 0) * 100).toFixed(1)}%`,
      impressions: apiItem.engagement.impression_cnt || 0,
      distribution_count: apiItem.engagement.reach_cnt || apiItem.engagement.impression_cnt || 0
    },
    expandedContent: {
      fullText: apiItem.content,
      reasoning: apiItem.intent,
      metrics: {
        participants: Math.floor((apiItem.engagement.impression_cnt || 0) * 0.01),
        comments: Math.floor((apiItem.engagement.impression_cnt || 0) * 0.005),
        shares: apiItem.engagement.repost_cnt || Math.floor((apiItem.engagement.impression_cnt || 0) * 0.002),
        saves: Math.floor((apiItem.engagement.impression_cnt || 0) * (apiItem.engagement.save_rate || 0.001)),
        clicks: Math.floor((apiItem.engagement.impression_cnt || 0) * (apiItem.engagement.click_rate || 0.01)),
        follows: apiItem.engagement.follower_growth_cnt || 0
      }
    }
  }
}

export async function fetchPosts(): Promise<SnsSuggestItem[]> {
  try {
    const url = `${API_BASE_URL}/posts/`
    console.log('🔍 SNS Suggest - Fetching posts from:', url)
    console.log('🔍 SNS Suggest - API_BASE_URL:', API_BASE_URL)
    console.log('🔍 SNS Suggest - Environment check:', {
      VITE_API_TARGET: import.meta.env.VITE_API_TARGET,
      NODE_ENV: import.meta.env.NODE_ENV,
      MODE: import.meta.env.MODE
    })
    
    const response = await fetch(url)
    
    console.log('🔍 SNS Suggest - Response status:', response.status)
    console.log('🔍 SNS Suggest - Response headers:', Object.fromEntries(response.headers.entries()))
    console.log('🔍 SNS Suggest - Response URL:', response.url)
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('🚨 SNS Suggest - Error response body:', errorText)
      throw new Error(`Failed to fetch posts: ${response.status} - ${errorText}`)
    }
    
    const text = await response.text()
    console.log('🔍 SNS Suggest - Response text (first 200 chars):', text.substring(0, 200))
    
    // Check if response is HTML (indicating an error page)
    if (text.trim().startsWith('<!')) {
      console.error('🚨 SNS Suggest - Received HTML instead of JSON:', text.substring(0, 500))
      throw new Error('API returned HTML instead of JSON')
    }
    
    const data: SnsSuggestApiResponse = JSON.parse(text)
    console.log('✅ SNS Suggest - Successfully parsed JSON data:', data)
    return data.items.map(transformApiItemToSnsSuggestItem)
  } catch (error) {
    console.error('🚨 SNS Suggest - API fetch failed, using mock data:', error)
    // Import mock data dynamically to avoid circular dependencies
    const { mockSnsSuggestData } = await import('./mock-data')
    return mockSnsSuggestData.items
  }
}

export async function sendLineBroadcast(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/line/broadcast/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  
  if (!response.ok) {
    throw new Error(`Failed to send broadcast: ${response.status}`)
  }
}

export async function updatePost(id: number, data: { content: string; platform: string }): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  
  if (!response.ok) {
    throw new Error(`Failed to update post: ${response.status}`)
  }
}