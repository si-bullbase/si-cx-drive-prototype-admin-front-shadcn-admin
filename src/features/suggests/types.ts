export interface ApiSnsSuggestItem {
  id: number
  keyword: string[]
  platform: string
  updated_at: string
  content: string
  intent: string
  target: string
  created_at: string
  engagement: {
    impression_cnt: number
    save_rate?: number
    engagement_rate: number
    reach_cnt?: number
    follower_growth_cnt: number
    click_rate?: number
    repost_cnt?: number
  }
}

export interface SnsSuggestItem {
  id: number
  platform: string
  keywords: string[]
  content: string
  target: string
  engagement: {
    rate: string
    impressions: number
    distribution_count: number
  }
  expandedContent?: {
    fullText: string
    reasoning: string
    metrics: {
      participants: number
      comments: number
      shares: number
      saves: number
      clicks: number
      follows: number
    }
  }
}

export interface SnsSuggestApiResponse {
  total: number
  items: ApiSnsSuggestItem[]
}