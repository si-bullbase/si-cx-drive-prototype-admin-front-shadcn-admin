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
  items: SnsSuggestItem[]
}