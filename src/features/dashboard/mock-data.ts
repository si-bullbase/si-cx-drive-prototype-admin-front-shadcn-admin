import { DashboardData } from './types'

export const mockDashboardData: DashboardData = {
  snsSuggestRanking: {
    total: 1053,
    items: [
      {
        id: 1,
        platform: "Instagram",
        keywords: ["生成AI", "ファッション", "集客"],
        content: "来場者の声をリアルタイムで分析！\n「LINE連携の具体的な活用事例が知りたい」\n「自動化でどれくらい工数削減でき…」",
        target: "マーケティング担当",
        engagement: {
          rate: "5.4%",
          impressions: 5000,
          distribution_count: 120
        }
      },
      {
        id: 2,
        platform: "Twitter",
        keywords: ["DX", "効率化", "働き方改革"],
        content: "DXで変わる働き方の新時代。\nリモートワークやハイブリッドワークが当たり前となり、デジタルツールの活用により場所に縛られない柔軟な働き方を実現。",
        target: "人事・総務担当",
        engagement: {
          rate: "4.2%",
          impressions: 4200,
          distribution_count: 98
        }
      },
      {
        id: 3,
        platform: "LinkedIn",
        keywords: ["クラウド", "セキュリティ", "インフラ"],
        content: "クラウドサービス活用術で企業のITインフラを最適化。\nコスト削減とスケーラビリティを実現し、セキュリティも強化されたクラウド環境で、イノベーションの創出を支援。",
        target: "IT責任者",
        engagement: {
          rate: "3.8%",
          impressions: 3800,
          distribution_count: 85
        }
      },
      {
        id: 4,
        platform: "Facebook",
        keywords: ["サイバーセキュリティ", "脅威対策", "データ保護"],
        content: "セキュリティ対策の重要性がますます高まる現代において、サイバー攻撃から企業を守るための包括的なソリューションを提供。",
        target: "セキュリティ担当",
        engagement: {
          rate: "3.1%",
          impressions: 3100,
          distribution_count: 72
        }
      },
      {
        id: 5,
        platform: "Instagram",
        keywords: ["デジタルマーケティング", "ROI", "データ分析"],
        content: "デジタルマーケティング最新動向を踏まえた戦略的アプローチで、顧客エンゲージメントを向上させ、ROIを最大化。",
        target: "マーケティング担当",
        engagement: {
          rate: "2.8%",
          impressions: 2800,
          distribution_count: 65
        }
      }
    ]
  },
  
  participants: {
    name: "参加人数",
    value: 1234
  },
  
  snsSuggestCount: {
    name: "SNSサジェスト候補",
    value: 156
  },
  
  hoge: {
    name: "未定項目",
    value: 789
  },
  
  exhibitRanking: [
    { rank: 1, name: "セールス・営業", value: 45 },
    { rank: 2, name: "エンジニア", value: 38 },
    { rank: 3, name: "マーケティング", value: 17 }
  ],
  
  jobPie: [
    { name: "セールス・営業", value: 35 },
    { name: "エンジニア", value: 28 },
    { name: "マーケティング", value: 15 },
    { name: "管理職", value: 12 },
    { name: "経営者・役員", value: 6 },
    { name: "人事・採用", value: 4 }
  ],
  
  industryPie: [
    { name: "IT・ソフトウェア", value: 42 },
    { name: "製造業", value: 18 },
    { name: "金融・保険", value: 15 },
    { name: "小売・流通", value: 12 },
    { name: "サービス業", value: 8 },
    { name: "その他", value: 5 }
  ],
  
  boothRanking: [
    { rank: 1, name: "AIソリューション", value: 256 },
    { rank: 2, name: "クラウドサービス", value: 234 },
    { rank: 3, name: "セキュリティ", value: 198 },
    { rank: 4, name: "DXコンサル", value: 176 },
    { rank: 5, name: "マーケティング", value: 145 }
  ],
  
  techTopicInterest: [
    { rank: 1, name: "AI・機械学習", value: 312 },
    { rank: 2, name: "クラウド", value: 289 },
    { rank: 3, name: "データ分析", value: 234 },
    { rank: 4, name: "セキュリティ", value: 198 },
    { rank: 5, name: "IoT", value: 156 }
  ],
  
  boothJobCross: [
    {
      name: "AIソリューション",
      executiveOfficer: 12,
      manager: 34,
      engineer: 89,
      salesStaff: 45,
      marketing: 23,
      recruitment: 8,
      others: 15
    },
    {
      name: "クラウドサービス",
      executiveOfficer: 8,
      manager: 28,
      engineer: 76,
      salesStaff: 39,
      marketing: 18,
      recruitment: 6,
      others: 12
    },
    {
      name: "セキュリティ",
      executiveOfficer: 15,
      manager: 42,
      engineer: 65,
      salesStaff: 28,
      marketing: 12,
      recruitment: 9,
      others: 18
    }
  ],
  
  jobPurposeCross: [
    {
      name: "経営者・役員",
      purpose1: 45,
      purpose2: 67,
      purpose3: 34,
      purpose4: 89,
      purpose5: 23,
      purpose6: 56,
      purpose7: 12,
      others: 8
    },
    {
      name: "管理職",
      purpose1: 78,
      purpose2: 92,
      purpose3: 45,
      purpose4: 67,
      purpose5: 34,
      purpose6: 89,
      purpose7: 23,
      others: 15
    },
    {
      name: "エンジニア",
      purpose1: 156,
      purpose2: 89,
      purpose3: 34,
      purpose4: 45,
      purpose5: 12,
      purpose6: 67,
      purpose7: 28,
      others: 23
    }
  ],
  
  mbtiAnalysis: [
    { name: "INTJ", value: 18 },
    { name: "ENTJ", value: 15 },
    { name: "INFP", value: 12 },
    { name: "ENFP", value: 14 },
    { name: "ISTJ", value: 16 },
    { name: "ESTJ", value: 13 },
    { name: "ISFJ", value: 8 },
    { name: "ESFJ", value: 4 }
  ],
  
  mbtiPurposeCross: [
    {
      name: "INTJ",
      purpose1: 89,
      purpose2: 67,
      purpose3: 23,
      purpose4: 34,
      purpose5: 12,
      purpose6: 45,
      purpose7: 8,
      others: 6
    },
    {
      name: "ENTJ",
      purpose1: 78,
      purpose2: 92,
      purpose3: 56,
      purpose4: 89,
      purpose5: 34,
      purpose6: 67,
      purpose7: 15,
      others: 12
    },
    {
      name: "ENFP",
      purpose1: 65,
      purpose2: 45,
      purpose3: 28,
      purpose4: 78,
      purpose5: 23,
      purpose6: 34,
      purpose7: 56,
      others: 18
    }
  ]
}