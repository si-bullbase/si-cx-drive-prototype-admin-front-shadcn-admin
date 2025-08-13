import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { Main } from '@/components/layout/main'
import { Overview } from './components/overview'
import { SimplePieChart } from './components/piechart'
import { StackedBarChart } from './components/stacked-bar-chart'
import {
  IconHeartHandshake,

} from '@tabler/icons-react'
import { SnsSuggestRankingCard } from './components/sns-suggest-ranking'
import { mockDashboardData } from './mock-data'
import { fetchDashboardSummary } from './api'
import type { DashboardData } from './types'
import { useState, useEffect } from 'react'

export default function Dashboard() {
  const [data, setData] = useState<DashboardData>(mockDashboardData)
  const [loading, setLoading] = useState(true)



  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true)
        const dashboardData = await fetchDashboardSummary()
        setData(dashboardData)
      } catch (err) {
        // Keep using mock data as fallback
        setData(mockDashboardData)
      } finally {
        setLoading(false)
      }
    }
    loadDashboardData()
  }, [])

  if (loading) {
    return (
      <Main>
        <div className='flex items-center justify-center h-96'>
          <div className='text-lg'>Loading dashboard...</div>
        </div>
      </Main>
    )
  }

  return (
    <>
      {/* ===== Main ===== */}
      <Main>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <h1 className='text-2xl font-bold tracking-tight'>
          </h1>
        </div>
        <Tabs
          orientation='vertical'
          defaultValue='overview'
          className=''
        >
          {/* SNSサジェストランキング */}
          <TabsContent value='overview' className='space-y-4'>
            <div className='grid grid-cols-1 gap-4 w-full'>
              <SnsSuggestRankingCard data={data.snsSuggestRanking} />
            </div>
            {/* 参加人数 */}
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
              <Card className='col-span-1 lg:col-span-1' style={{ backgroundColor: '#CDF3D5' }}>
                <CardContent className='h-40 py-4 flex flex-col items-center justify-between'>
                  <IconHeartHandshake className='w-6 h-6' />
                  <div className='text-6xl font-bold' style={{ color: '#06C42C' }}>{data.participants.value.toLocaleString()}人</div>
                  <div className='text-sm'>{data.participants.name}</div>
                </CardContent>
              </Card>

              <Card className='col-span-1 lg:col-span-1' style={{ backgroundColor: '#CDF3D5' }}>
                <CardContent className='h-40 py-4 flex flex-col items-center justify-between'>
                  <IconHeartHandshake className='w-6 h-6' />
                  <div className='text-6xl font-bold' style={{ color: '#06C42C' }}>{data.snsSuggestCount.value.toLocaleString()}件</div>
                  <div className='text-sm'>{data.snsSuggestCount.name}</div>
                </CardContent>
              </Card>

            </div>
            {/* ランキング */}
            <Card className='col-span-1 lg:col-span-1' style={{ backgroundColor: '#06C42C' }}>
            <CardHeader>
              <CardTitle style={{ color: '#ffffff' }}>ランキング</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                {data.exhibitRanking.slice(0, 3).map((item) => (
                  <div
                    key={item.rank}
                    className='h-40 py-4 flex flex-col items-center justify-between border rounded-lg'
                    style={{ backgroundColor: '#E6F9EA' }}
                  >
                    <div className='text-4xl font-bold' style={{ color: '#06C42C' }}>
                      <span className='text-6xl'>{item.rank}</span>
                      <span className='text-2xl'>位</span>
                    </div>
                    <div className='text-4xl font-bold text-center' style={{ color: '#06C42C' }}>{item.name}</div>
                    <div className='text-lg' style={{ color: '#1A1A1A' }}>{item.value}％</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

            {/* 職種別×業種別 */}
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
              <Card className='col-span-1 lg:col-span-1'>
                <CardHeader>
                  <CardTitle className='text-3xl text-center' style={{ color: '#06C42C' }}>職種別</CardTitle>
                </CardHeader>
                <CardContent className='pl-2'>
                  <SimplePieChart data={data.jobPie} />
                </CardContent>
              </Card>
              <Card className='col-span-1 lg:col-span-1'>
                <CardHeader>
                  <CardTitle className='text-3xl text-center' style={{ color: '#06C42C' }}>業種別</CardTitle>
                </CardHeader>
                <CardContent className='pl-2'>
                  <SimplePieChart data={data.industryPie} />
                </CardContent>
              </Card>
            </div>

            {/* ブース人気ランキング */}
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
              <Card className='col-span-1 lg:col-span-1'>
                <CardHeader>
                  <CardTitle className='text-3xl' style={{ color: '#06C42C', textAlign: 'center' }}>ブース人気ランキング</CardTitle>
                </CardHeader>
                <CardContent className='pl-2'>
                  <Overview data={data.boothRanking} />
                </CardContent>
              </Card>
              <Card className='col-span-1 lg:col-span-1'>
                <CardHeader>
                  <CardTitle className='text-3xl' style={{ color: '#06C42C', textAlign: 'center' }}>技術トピック別 関心度</CardTitle>
                </CardHeader>
                <CardContent className='pl-2'>
                  <Overview data={data.techTopicInterest} />
                </CardContent>
              </Card>
            </div>

            {/* ブース×職種クロス分析 */}
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-1'>
              <Card className='col-span-1 lg:col-span-1'>
                <CardHeader>
                  <CardTitle className='text-3xl' style={{ color: '#06C42C', textAlign: 'center' }}>ブース×職種クロス分析</CardTitle>
                </CardHeader>
                <CardContent className='pl-2'>
                  <StackedBarChart data={data.boothJobCross} />
                </CardContent>
              </Card>
            </div>

              {/* 職種別×参加目的クロス分析 */}
              <div className='grid grid-cols-1 gap-4 lg:grid-cols-1'>
              <Card className='col-span-1 lg:col-span-1'>
                <CardHeader>
                  <CardTitle className='text-3xl' style={{ color: '#06C42C', textAlign: 'center' }}>職種別×参加目的クロス分析</CardTitle>
                </CardHeader>
                <CardContent className='pl-2'>
                  <StackedBarChart data={data.jobPurposeCross} />
                </CardContent>
              </Card>
            </div>

              {/* MBTI分析 */}
              <div className='grid grid-cols-1 gap-4 lg:grid-cols-1'>
              <Card className='col-span-1 lg:col-span-1'>
                <CardHeader>
                  <CardTitle className='text-3xl' style={{ color: '#06C42C', textAlign: 'center' }}>MBTI分析</CardTitle>
                </CardHeader>
                <CardContent className='pl-2'>
                  <SimplePieChart data={data.mbtiAnalysis} />
                </CardContent>
              </Card>
            </div>

              {/* MBTI別×参加目的クロス分析 */}
              <div className='grid grid-cols-1 gap-4 lg:grid-cols-1'>
              <Card className='col-span-1 lg:col-span-1'>
                <CardHeader>
                  <CardTitle className='text-3xl' style={{ color: '#06C42C', textAlign: 'center' }}>MBTI別×参加目的クロス分析</CardTitle>
                </CardHeader>
                <CardContent className='pl-2'>
                  <StackedBarChart data={data.mbtiPurposeCross} />
                </CardContent>
              </Card>
            </div>

          </TabsContent>
        </Tabs>
      </Main>
    </>
  )
}
