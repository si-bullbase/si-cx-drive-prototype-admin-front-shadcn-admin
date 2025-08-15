export interface SnsSuggestRankingItem {
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
}

export interface SnsSuggestApiResponse {
  total: number
  items: SnsSuggestRankingItem[]
}

export interface StatCard {
  name: string
  value: number
}

export interface RankingItem {
  rank: number
  name: string
  value: number
}

export interface PieChartItem {
  name: string
  value: number
}

export interface BoothJobCrossItem {
  name: string
  executiveOfficer: number
  manager: number
  engineer: number
  salesStaff: number
  marketing: number
  recruitment: number
  others: number
}

export interface CrossAnalysisItem {
  name: string
  purpose1: number
  purpose2: number
  purpose3: number
  purpose4: number
  purpose5: number
  purpose6: number
  purpose7: number
  others: number
}

export interface DashboardData {
  snsSuggestRanking: SnsSuggestApiResponse
  participants?: StatCard
  answersCount: StatCard
  snsSuggestCount: StatCard
  hoge?: StatCard
  exhibitRanking: RankingItem[]
  jobPie: PieChartItem[]
  industryPie: PieChartItem[]
  boothRanking: RankingItem[]
  techTopicInterest: RankingItem[]
  boothJobCross: BoothJobCrossItem[]
  jobPurposeCross: CrossAnalysisItem[]
  mbtiAnalysis: PieChartItem[]
  mbtiPurposeCross: CrossAnalysisItem[]
}