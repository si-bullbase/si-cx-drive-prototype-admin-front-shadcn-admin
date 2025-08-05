import { SnsSuggestApiResponse } from './types'

export const mockSnsSuggestData: SnsSuggestApiResponse = {
  total: 1053,
  items: [
    {
      id: 1,
      platform: "LINE",
      keywords: ["生成AI", "CXDrive", "展示会"],
      content: "展示会で注目の生成AIツール「CXDrive」！来場者の皆様からの熱い質問が続々と...「ROIはどのくらい改善できる？」「導入までの期間は？」",
      target: "マーケティング",
      engagement: {
        rate: "5.4%",
        impressions: 5000,
        distribution_count: 120
      },
      expandedContent: {
        fullText: "展示会で話題の生成AIツール「CXDrive」をご紹介！来場者からは「ROIはどのくらい改善できる？」「導入期間は？」など熱い質問が続々。AI活用で業務効率化や新たな価値創出が期待されます。今後の展開にもご注目ください！",
        reasoning: "展示会での実際の来場者の質問を基に、生成AIツール「CXDrive」への関心の高さを訴求。具体的な効果（ROI改善、導入期間）への言及により、検討段階の見込み客の興味を引きつける戦略です。",
        metrics: {
          participants: 1234,
          comments: 567,
          shares: 890,
          saves: 234,
          clicks: 567,
          follows: 890
        }
      }
    },
    {
      id: 2,
      platform: "Instagram",
      keywords: ["高校受験", "塾", "スマートフォン"],
      content: "高校受験を控えた家庭の悩みに、塾/私中の子どものスマートフォン利用にルールを設けるーー。学習塾「明光義塾」を展開する明光ネットワークジャパン（東京都新宿区）が高校進学を希望する中学3年生の…",
      target: "エンジニア",
      engagement: {
        rate: "4.2%",
        impressions: 4200,
        distribution_count: 98
      },
      expandedContent: {
        fullText: "高校受験を控えた家庭の悩みに応える明光義塾の取り組み。子どものスマートフォン利用ルールを設けることで、学習効率向上を目指します。受験生の集中力アップと健全な学習環境づくりをサポートしています。",
        reasoning: "高校受験を控える家庭の共通の悩みであるスマートフォン利用問題を取り上げ、明光義塾の具体的な解決策を提示。保護者の関心を引きつけ、塾選びの判断材料として訴求する戦略です。",
        metrics: {
          participants: 980,
          comments: 342,
          shares: 156,
          saves: 89,
          clicks: 234,
          follows: 67
        }
      }
    },
    {
      id: 3,
      platform: "Twitter",
      keywords: ["参院選", "期日前投票", "SNS"],
      content: "参院選（20日投開票）の期日前投票で、有権者が投票所で候補者や政党名の記入を終えた投票用紙を撮影し、X（旧ツイッター）に投稿する事例が相次いでいる。「推し」の候補者や政党の支持を広げる目的が…",
      target: "経営者・役員",
      engagement: {
        rate: "3.8%",
        impressions: 3800,
        distribution_count: 85
      },
      expandedContent: {
        fullText: "参院選の期日前投票で投票用紙をSNSに投稿する事例が増加。「推し」候補への支持表明が目的だが、選挙法違反の可能性も。適切な選挙参加と情報発信のバランスについて考える必要があります。",
        reasoning: "選挙に関する最新のトレンドと法的な問題を取り上げ、有権者の関心を引きつつ、適切な選挙参加について啓発する内容。時事性と社会的意義を両立させた投稿戦略です。",
        metrics: {
          participants: 756,
          comments: 289,
          shares: 445,
          saves: 123,
          clicks: 334,
          follows: 89
        }
      }
    },
    {
      id: 4,
      platform: "LINE",
      keywords: ["DX", "業務効率化", "AI"],
      content: "AIを活用した業務効率化の最新事例を紹介。DX推進のための具体的なステップを解説します。",
      target: "管理職",
      engagement: {
        rate: "5.1%",
        impressions: 5100,
        distribution_count: 120
      },
      expandedContent: {
        fullText: "AI導入による業務効率化の成功事例をもとに、DX推進のためのポイントを解説。現場の課題を洗い出し、段階的にAIを活用することで、組織全体の生産性向上を目指します。",
        reasoning: "管理職層が抱えるDX推進の課題に対し、具体的なAI活用事例を提示。実践的なノウハウを共有することで、現場への導入を後押しする狙いです。",
        metrics: {
          participants: 1200,
          comments: 410,
          shares: 210,
          saves: 95,
          clicks: 410,
          follows: 102
        }
      }
    },
    {
      id: 5,
      platform: "Instagram",
      keywords: ["キャリア", "働き方", "リモートワーク"],
      content: "エンジニアのための最新リモートワーク事情。キャリアアップに役立つ情報をまとめました。",
      target: "エンジニア",
      engagement: {
        rate: "4.7%",
        impressions: 4700,
        distribution_count: 110
      },
      expandedContent: {
        fullText: "エンジニア向けに、リモートワークのメリット・デメリットや、キャリアアップのためのスキル習得法を紹介。実際の現場の声も掲載しています。",
        reasoning: "エンジニアが関心を持つリモートワークやキャリア形成にフォーカスし、実践的な情報を提供。転職やスキルアップを目指す層のエンゲージメント向上を狙います。",
        metrics: {
          participants: 1100,
          comments: 380,
          shares: 180,
          saves: 88,
          clicks: 370,
          follows: 95
        }
      }
    },
    {
      id: 6,
      platform: "Twitter",
      keywords: ["営業", "顧客開拓", "SNS活用"],
      content: "SNSを活用した新規顧客開拓のコツを解説。営業現場で使える最新テクニックを紹介します。",
      target: "セールス・営業",
      engagement: {
        rate: "4.0%",
        impressions: 4000,
        distribution_count: 105
      },
      expandedContent: {
        fullText: "SNSを活用した営業活動の成功事例や、顧客との信頼関係構築のポイントを解説。実践的なノウハウをまとめています。",
        reasoning: "営業担当者がすぐに使えるSNS活用術を紹介し、現場での成果につなげることを目的とした投稿。実例を交えて説得力を高めています。",
        metrics: {
          participants: 1050,
          comments: 320,
          shares: 160,
          saves: 70,
          clicks: 290,
          follows: 80
        }
      }
    },
    {
      id: 7,
      platform: "LINE",
      keywords: ["マーケティング", "データ分析", "トレンド"],
      content: "最新のマーケティングトレンドとデータ分析手法を解説。成果につながる施策を紹介します。",
      target: "マーケティング",
      engagement: {
        rate: "5.5%",
        impressions: 5500,
        distribution_count: 130
      },
      expandedContent: {
        fullText: "データドリブンなマーケティング戦略の立て方や、最新トレンドの活用事例を紹介。成果を最大化するための分析手法も解説します。",
        reasoning: "マーケターが求める最新トレンドや分析ノウハウを提供し、実務に役立つ情報でエンゲージメントを高める狙いです。",
        metrics: {
          participants: 1300,
          comments: 450,
          shares: 230,
          saves: 110,
          clicks: 480,
          follows: 120
        }
      }
    },
    {
      id: 8,
      platform: "Instagram",
      keywords: ["採用", "人材育成", "企業文化"],
      content: "人事担当者向け、企業文化を活かした採用・人材育成のポイントを紹介します。",
      target: "人事・採用",
      engagement: {
        rate: "4.3%",
        impressions: 4300,
        distribution_count: 100
      },
      expandedContent: {
        fullText: "企業文化を活かした採用活動や、人材育成の成功事例を紹介。現場で役立つ具体的な施策も解説します。",
        reasoning: "人事・採用担当者が直面する課題に対し、企業文化を活かしたアプローチを提案。実践的な事例で信頼感を高める投稿です。",
        metrics: {
          participants: 1000,
          comments: 340,
          shares: 150,
          saves: 75,
          clicks: 260,
          follows: 70
        }
      }
    },
    {
      id: 9,
      platform: "Twitter",
      keywords: ["副業", "働き方改革", "多様性"],
      content: "多様な働き方を実現する副業の始め方と注意点を解説。最新の働き方改革事例も紹介します。",
      target: "その他",
      engagement: {
        rate: "3.9%",
        impressions: 3900,
        distribution_count: 90
      },
      expandedContent: {
        fullText: "副業を始める際のポイントや、働き方改革の最新事例を紹介。多様な働き方を実現するためのヒントをまとめています。",
        reasoning: "ターゲットを限定せず、幅広い層に向けて副業や働き方改革の情報を発信。多様性を重視した内容で共感を呼ぶ投稿です。",
        metrics: {
          participants: 900,
          comments: 310,
          shares: 140,
          saves: 60,
          clicks: 210,
          follows: 60
        }
      }
    },

  ]
}