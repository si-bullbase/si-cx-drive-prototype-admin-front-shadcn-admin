export interface Suggest {
  id: string;
  sns: 'LINE' | 'Twitter' | 'Instagram' | 'Facebook';
  content: string;
  keywords: string[];
  target: string;
  engagementRate: number;
  impressions: number;
  reach: number;
  createdAt: string;
}

export const mockSuggests: Suggest[] = [
  {
    id: '1',
    sns: 'LINE',
    content: 'AI技術の最新トレンドについて詳しく解説します。生成AIがどのようにビジネスを変革しているか、実例を交えてお伝えします。',
    keywords: ['生成人工知能', 'ビジネス'],
    target: 'マーケティング担当',
    engagementRate: 5.4,
    impressions: 500,
    reach: 120,
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    sns: 'Twitter',
    content: '今日のファッショントレンド：サステナブルファッションが注目されています。環境に配慮したブランドの選び方をご紹介。',
    keywords: ['ファッション', 'サステナブル'],
    target: 'ファッション愛好家',
    engagementRate: 3.2,
    impressions: 3200,
    reach: 85,
    createdAt: '2024-01-14'
  },
  {
    id: '3',
    sns: 'Instagram',
    content: '朝活のススメ：早起きして運動する習慣が人生を変える理由。実際の効果と始め方を写真付きで解説。',
    keywords: ['健康', 'ライフスタイル', '運動'],
    target: '健康意識の高い層',
    engagementRate: 7.8,
    impressions: 780,
    reach: 20,
    createdAt: '2024-01-13'
  },
  {
    id: '4',
    sns: 'Facebook',
    content: '働き方改革の実践例：リモートワークで生産性を向上させる方法。チームコミュニケーションのコツも紹介。',
    keywords: ['働き方改革', 'リモートワーク', 'コミュニケーション'],
    target: 'ビジネスパーソン',
    engagementRate: 4.1,
    impressions: 4100,
    reach: 95,
    createdAt: '2024-01-12'
  },
  {
    id: '5',
    sns: 'LINE',
    content: '料理初心者向け：簡単で美味しいレシピ集。時短テクニックも満載で、忙しい方にもおすすめです。',
    keywords: ['料理', 'レシピ', '時短'],
    target: '料理初心者',
    engagementRate: 6.2,
    impressions: 620,
    reach: 150,
    createdAt: '2024-01-11'
  },
  {
    id: '6',
    sns: 'Twitter',
    content: '投資初心者ガイド：株と投資信託の違いを分かりやすく解説。リスク管理の基本も学べます。',
    keywords: ['投資', '株', '投資信託'],
    target: '投資初心者',
    engagementRate: 2.9,
    impressions: 2900,
    reach: 70,
    createdAt: '2024-01-10'
  },
  {
    id: '7',
    sns: 'Instagram',
    content: '旅行記：京都の隠れた名所を巡る旅。観光客が少ない穴場スポットを写真と共にご紹介。',
    keywords: ['旅行', '京都', '観光'],
    target: '旅行好き',
    engagementRate: 8.5,
    impressions: 850,
    reach: 220,
    createdAt: '2024-01-19'
  },
  {
    id: '8',
    sns: 'Facebook',
    content: '子育ての悩み解決：子どもの教育について専門家に聞きました。年齢別の接し方のコツを紹介。',
    keywords: ['子育て', '教育', '育児'],
    target: '子育て中の親',
    engagementRate: 5.7,
    impressions: 570,
    reach: 130,
    createdAt: '2024-01-18'
  },
  {
    id: '9',
    sns: 'LINE',
    content: '節約術：家計を改善するための具体的な方法。固定費の見直しから始める節約のコツ。',
    keywords: ['節約', '家計', '固定費'],
    target: '家計管理に興味がある方',
    engagementRate: 4.8,
    impressions: 480,
    reach: 110,
    createdAt: '2024-01-17'
  },
  {
    id: '10',
    sns: 'Twitter',
    content: '読書のすすめ：今月読むべきビジネス書ベスト5。成功者の思考法を学べる本を厳選しました。',
    keywords: ['読書', 'ビジネス書', '自己啓発'],
    target: 'ビジネスパーソン',
    engagementRate: 3.6,
    impressions: 3600,
    reach: 90,
    createdAt: '2024-01-16'
  },
  {
    id: '11',
    sns: 'Instagram',
    content: 'DIYプロジェクト：週末でできる簡単な家具作り。材料費も安く、オリジナルのインテリアを作れます。',
    keywords: ['DIY', '家具', 'インテリア'],
    target: 'DIY好き',
    engagementRate: 6.9,
    impressions: 690,
    reach: 180,
    createdAt: '2024-01-15'
  },
  {
    id: '12',
    sns: 'Facebook',
    content: 'メンタルヘルスケア：ストレス解消法と心の健康を保つ方法。専門家によるアドバイスを紹介。',
    keywords: ['メンタルヘルス', 'ストレス解消', '健康'],
    target: 'メンタルヘルスに興味がある方',
    engagementRate: 5.1,
    impressions: 510,
    reach: 120,
    createdAt: '2024-01-04'
  }
];

export const getSuggestsWithPagination = (
  page: number,
  pageSize: number,
  searchTerm?: string,
  snsFilter?: string
) => {
  let filteredData = [...mockSuggests];

  // 検索フィルター
  if (searchTerm) {
    filteredData = filteredData.filter(
      suggest =>
        suggest.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        suggest.keywords.some(keyword => 
          keyword.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        suggest.target.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // SNSフィルター
  if (snsFilter && snsFilter !== 'all') {
    filteredData = filteredData.filter(suggest => suggest.sns === snsFilter);
  }

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  return {
    data: paginatedData,
    pagination: {
      currentPage: page,
      totalPages,
      totalItems,
      pageSize,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1
    }
  };
}; 