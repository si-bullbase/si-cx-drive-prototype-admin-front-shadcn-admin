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
      rate: `${(apiItem.engagement.engagement_rate * 100).toFixed(1)}%`,
      impressions: apiItem.engagement.impression_cnt,
      distribution_count: apiItem.engagement.reach_cnt || apiItem.engagement.impression_cnt
    },
    expandedContent: {
      fullText: apiItem.content,
      reasoning: apiItem.intent,
      metrics: {
        participants: Math.floor(apiItem.engagement.impression_cnt * 0.01),
        comments: Math.floor(apiItem.engagement.impression_cnt * 0.005),
        shares: apiItem.engagement.repost_cnt || Math.floor(apiItem.engagement.impression_cnt * 0.002),
        saves: Math.floor(apiItem.engagement.impression_cnt * (apiItem.engagement.save_rate || 0.001)),
        clicks: Math.floor(apiItem.engagement.impression_cnt * (apiItem.engagement.click_rate || 0.01)),
        follows: apiItem.engagement.follower_growth_cnt
      }
    }
  }
}

export async function fetchPosts(): Promise<SnsSuggestItem[]> {
  const response = await fetch(`${API_BASE_URL}/posts/`)
  
  if (!response.ok) {
    throw new Error(`Failed to fetch posts: ${response.status}`)
  }
  
  const data: SnsSuggestApiResponse = await response.json()
  return data.items.map(transformApiItemToSnsSuggestItem)
}