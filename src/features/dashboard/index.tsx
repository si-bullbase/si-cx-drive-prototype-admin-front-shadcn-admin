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

export default function Dashboard() {
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
              <SnsSuggestRankingCard />
            </div>
            {/* 参加人数 */}
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-3'>
              <Card className='col-span-1 lg:col-span-1' style={{ backgroundColor: '#CDF3D5' }}>
                <CardContent className='h-40 py-4 flex flex-col items-center justify-between'>
                  <IconHeartHandshake className='w-6 h-6' />
                  <div className='text-4xl font-bold' style={{ color: '#06C42C' }}>1234人</div>
                  <div className='text-sm'>参加人数</div>
                </CardContent>
              </Card>

              <Card className='col-span-1 lg:col-span-1' style={{ backgroundColor: '#CDF3D5' }}>
                <CardContent className='h-40 py-4 flex flex-col items-center justify-between'>
                  <IconHeartHandshake className='w-6 h-6' />
                  <div className='text-4xl font-bold' style={{ color: '#06C42C' }}>1234人</div>
                  <div className='text-sm'>参加人数</div>
                </CardContent>
              </Card>
              <Card className='col-span-1 lg:col-span-1' style={{ backgroundColor: '#CDF3D5' }}>
                <CardContent className='h-40 py-4 flex flex-col items-center justify-between'>
                  <IconHeartHandshake className='w-6 h-6' />
                  <div className='text-4xl font-bold' style={{ color: '#06C42C' }}>1234人</div>
                  <div className='text-sm'>参加人数</div>
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
                {/* ミニカード1 */}
                <div
                  className='h-40 py-4 flex flex-col items-center justify-between border rounded-lg'
                  style={{ backgroundColor: '#E6F9EA' }}
                >
                  <div className='text-4xl font-bold' style={{ color: '#06C42C' }}>1位</div>
                  <div className='text-4xl font-bold' style={{ color: '#06C42C' }}>セールス・営業</div>
                  <div className='text-sm' style={{ color: '#1A1A1A' }}>XX％</div>
                </div>

                {/* ミニカード2 */}
                <div className='h-40 py-4 flex flex-col items-center justify-between border rounded-lg' style={{ backgroundColor: '#E6F9EA' }}>
                  <div className='text-4xl font-bold' style={{ color: '#06C42C' }}>2位</div>
                  <div className='text-4xl font-bold' style={{ color: '#06C42C' }}>エンジニア</div>
                  <div className='text-sm' style={{ color: '#1A1A1A' }}>XX％</div>
                </div>

                {/* ミニカード3 */}
                <div className='h-40 py-4 flex flex-col items-center justify-between border rounded-lg' style={{ backgroundColor: '#E6F9EA' }}>
                  <div className='text-4xl font-bold' style={{ color: '#06C42C' }}>3位</div>
                  <div className='text-4xl font-bold' style={{ color: '#06C42C' }}>マーケティング</div>
                  <div className='text-sm' style={{ color: '#1A1A1A' }}>XX％</div>
                </div>
              </div>
            </CardContent>
          </Card>

            {/* 職種別×業種別 */}
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
              <Card className='col-span-1 lg:col-span-1'>
                <CardHeader>
                  <CardTitle style={{ color: '#06C42C', textAlign: 'center' }}>職種別</CardTitle>
                </CardHeader>
                <CardContent className='pl-2'>
                  <SimplePieChart />
                </CardContent>
              </Card>
              <Card className='col-span-1 lg:col-span-1'>
                <CardHeader>
                  <CardTitle style={{ color: '#06C42C', textAlign: 'center' }}>業種別</CardTitle>
                </CardHeader>
                <CardContent className='pl-2'>
                  <SimplePieChart />
                </CardContent>
              </Card>
            </div>

            {/* ブース人気ランキング */}
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
              <Card className='col-span-1 lg:col-span-1'>
                <CardHeader>
                  <CardTitle style={{ color: '#06C42C', textAlign: 'center' }}>ブース人気ランキング</CardTitle>
                </CardHeader>
                <CardContent className='pl-2'>
                  <Overview />
                </CardContent>
              </Card>
              <Card className='col-span-1 lg:col-span-1'>
                <CardHeader>
                  <CardTitle style={{ color: '#06C42C', textAlign: 'center' }}>技術トピック別 関心度</CardTitle>
                </CardHeader>
                <CardContent className='pl-2'>
                  <Overview />
                </CardContent>
              </Card>
            </div>

            {/* ブース×職種クロス分析 */}
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-1'>
              <Card className='col-span-1 lg:col-span-1'>
                <CardHeader>
                  <CardTitle style={{ color: '#06C42C', textAlign: 'center' }}>ブース×職種クロス分析</CardTitle>
                </CardHeader>
                <CardContent className='pl-2'>
                  <StackedBarChart />
                </CardContent>
              </Card>
            </div>

              {/* 職種別×参加目的クロス分析 */}
              <div className='grid grid-cols-1 gap-4 lg:grid-cols-1'>
              <Card className='col-span-1 lg:col-span-1'>
                <CardHeader>
                  <CardTitle style={{ color: '#06C42C', textAlign: 'center' }}>職種別×参加目的クロス分析</CardTitle>
                </CardHeader>
                <CardContent className='pl-2'>
                  <StackedBarChart />
                </CardContent>
              </Card>
            </div>

              {/* MBTI分析 */}
              <div className='grid grid-cols-1 gap-4 lg:grid-cols-1'>
              <Card className='col-span-1 lg:col-span-1'>
                <CardHeader>
                  <CardTitle style={{ color: '#06C42C', textAlign: 'center' }}>MBTI分析</CardTitle>
                </CardHeader>
                <CardContent className='pl-2'>
                  <SimplePieChart />
                </CardContent>
              </Card>
            </div>

              {/* ブース×職種クロス分析 */}
              <div className='grid grid-cols-1 gap-4 lg:grid-cols-1'>
              <Card className='col-span-1 lg:col-span-1'>
                <CardHeader>
                  <CardTitle style={{ color: '#06C42C', textAlign: 'center' }}>ブース×職種クロス分析</CardTitle>
                </CardHeader>
                <CardContent className='pl-2'>
                  <StackedBarChart />
                </CardContent>
              </Card>
            </div>

          </TabsContent>
        </Tabs>
      </Main>
    </>
  )
}
