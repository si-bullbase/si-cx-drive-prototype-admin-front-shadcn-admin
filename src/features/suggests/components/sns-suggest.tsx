import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { EditDialog } from './edite-dialog'
import { ImagePopup } from './image-popup'
import { DeletePopup } from './delete-popup'
import { SendConfirmDialog } from './send-confirm-dialog'
import { SuggestsPagination } from './suggests-pagination'
import { fetchPosts, sendLineBroadcast } from '../api'
import type { SnsSuggestItem } from '../types'

interface SnsSuggestProps {
  item: SnsSuggestItem
}

const platformIcons = {
  Instagram: '/images/instagram.svg',
  Twitter: '/images/X.svg',
  LinkedIn: '/images/linkedin.svg',
}

const targetColors = {
  '経営者・役員': 'border-purple-500',
  '管理職': 'border-blue-500', 
  'エンジニア': 'border-green-500',
  'セールス・営業': 'border-yellow-500',
  'マーケティング': 'border-red-500',
  '人事・採用': 'border-orange-500',
  'その他': 'border-gray-500'
}

function SnsSuggestCard({ item }: SnsSuggestProps) {
  const [open, setOpen] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const handleSendConfirm = async () => {
    try {
      // LINE配信API呼び出し
      await sendLineBroadcast(item.id);
      
      // 成功時のポップアップ
      setShowSuccessPopup(true);
    } catch (error) {
      console.error('Failed to send broadcast:', error);
      // 失敗時のポップアップ
      setShowErrorPopup(true);
    }
  };

  const platformIcon = platformIcons[item.platform as keyof typeof platformIcons] || '/images/LINE.svg';
  const targetColor = targetColors[item.target as keyof typeof targetColors] || 'border-gray-500';

  return (
    <>
    <Collapsible open={open} onOpenChange={setOpen} className="py-0">
        <Card>
          <div className={`grid grid-cols-[4%_36%_12%_20%_16%_20%] items-center ${open ? ' border-b' : ''}`}>
            {/* SNSアイコン */}
            <div className="flex justify-center">
              <img src={platformIcon} alt={item.platform} width="24" />
            </div>
            {/* 投稿内容・キーワード */}
            <div>
              <div className="line-clamp-2">{item.content}</div>
              <div className="flex gap-1 mt-1">
                {item.keywords.map((keyword, index) => (
                  <span key={index} className="bg-primary rounded px-2 py-0.5 text-s">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
            {/* ターゲット */}
            <div className="flex items-center justify-center">
              <span className={`border rounded px-2 py-1 text-xs ${targetColor}`}>
                {item.target}
              </span>
            </div>
            {/* 予測エンゲージメント */}
            <div>
              <ul className="pl-2 space-y-1">
                <li className="py-0.5"><span className="text-green-500 font-bold">・</span>エンゲージメント率 {item.engagement.rate}</li>
                <li className="py-0.5"><span className="text-green-500 font-bold">・</span>インプレッション数 {(item.engagement.impressions || 0).toLocaleString()}</li>
                <li className="py-0.5"><span className="text-green-500 font-bold">・</span>配信対象数 {item.engagement.distribution_count || 0}</li>
              </ul>
            </div>
            {/* アクション */}
            <div className="flex gap-2 justify-center">
              {/* 送信ボタン */}
              <SendConfirmDialog onConfirm={handleSendConfirm}>
                <button type="button" className="p-2 rounded hover:bg-green-100 transition" title="送信">
                  <img src="/images/send.svg" alt="送信" width="32" />
                </button>
              </SendConfirmDialog>
              {/* 編集ボタン → EditeDialogで置き換え */}
              <EditDialog 
                id={item.id}
                initialContent={item.content}
                initialSns={item.platform}
              />
              {/* 削除ボタン */}
              <DeletePopup />
            </div>
            {/* 展開/折りたたみトリガー */}
            <div className="flex justify-center">
              <CollapsibleTrigger asChild>
                <button type="button" className="p-1 rounded hover:bg-gray-100 transition">
                  {open ? (
                    // 上向き矢印（折りたたみ）
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.41 15.59L12 11L16.59 15.59L18 14.17L12 8.17L6 14.17L7.41 15.59Z" fill="currentColor"/>
                    </svg>
                  ) : (
                    // 下向き矢印（展開）
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.41 8.41L12 13L16.59 8.41L18 9.83L12 15.83L6 9.83L7.41 8.41Z" fill="currentColor"/>
                    </svg>
                  )}
                </button>
              </CollapsibleTrigger>
            </div>
          </div>
          {/* 展開時の内容 */}
          <CollapsibleContent>
            <CardContent>
              <div className="grid grid-cols-[40%_60%] gap-4">
                
                {/* 左側（40%） */}
                <div>
                  <div className="grid grid-cols-1 gap-4 h-2/5">
                    <div className='flex flex-col justify-between'>
                      <div>{item.expandedContent?.fullText || item.content}</div>
                    </div>
                  </div>
                  
                  <div className="grid h-3/5">
                    <div className='flex flex-col justify-between'>
                      <Card className="bg-gray-100 border-0 shadow-none">
                        <CardHeader>
                          <CardTitle>
                            投稿の狙いと根拠
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div>
                            {item.expandedContent?.reasoning || '投稿の戦略や根拠についてのデータがありません。'}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
                {/* 右側（60%） */}
                <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <Card className='col-span-1 lg:col-span-1 border-0 shadow-none' style={{ backgroundColor: '#CDF3D5' }}>
                        <CardContent className='flex flex-col items-center justify-between'>
                          <img src="/images/heart-handshake.svg" alt="エンゲージメント率アイコン" className="w-6 h-6 mb-2" />
                          <div className='text-4xl font-bold' style={{ color: '#06C42C' }}>
                            {item.expandedContent?.metrics.participants || 0}人
                          </div>
                          <div className='text-sm'>エンゲージメント率</div>
                        </CardContent>
                      </Card>
                      <Card className='col-span-1 lg:col-span-1 border-0 shadow-none' style={{ backgroundColor: '#CDF3D5' }}>
                        <CardContent className='flex flex-col items-center justify-between'>
                          <img src="/images/bar-chart-3.svg" alt="コメントアイコン" className="w-6 h-6 mb-2" />
                             <div className='text-4xl font-bold' style={{ color: '#06C42C' }}>
                            {item.expandedContent?.metrics.comments || 0}
                          </div>
                          <div className='text-sm'>インプレッション数</div>
                        </CardContent>
                      </Card>
                      <Card className='col-span-1 lg:col-span-1 border-0 shadow-none' style={{ backgroundColor: '#CDF3D5' }}>
                        <CardContent className='flex flex-col items-center justify-between'>
                          <img src="/images/wifi.svg" alt="Wi-Fiアイコン" className="w-6 h-6 mb-2" />
                          <div className='text-4xl font-bold' style={{ color: '#06C42C' }}>
                            {item.expandedContent?.metrics.shares || 0}
                          </div>
                          <div className='text-sm'>配信対象数
                          </div>
                        </CardContent>
                      </Card>
                      <Card className='col-span-1 lg:col-span-1 border-0 shadow-none' style={{ backgroundColor: '#CDF3D5' }}>
                        <CardContent className='flex flex-col items-center justify-between'>
                          <img src="/images/shopping-cart.svg" alt="CV率のアイコン" className="w-6 h-6 mb-2"/>
                          <div className='text-4xl font-bold' style={{ color: '#06C42C' }}>
                            {item.expandedContent?.metrics.saves || 0}
                          </div>
                          <div className='text-sm'>CV率</div>
                        </CardContent>
                      </Card>
                      <Card className='col-span-1 lg:col-span-1 border-0 shadow-none' style={{ backgroundColor: '#CDF3D5' }}>
                        <CardContent className='flex flex-col items-center justify-between'>
                          <img src="/images/mouse-pointer-click.svg" alt="クリック率" className="w-6 h-6 mb-2" />
                          <div className='text-4xl font-bold' style={{ color: '#06C42C' }}>
                            {item.expandedContent?.metrics.clicks || 0}
                          </div>
                          <div className='text-sm'>クリック数</div>
                        </CardContent>
                      </Card>
                      <Card className='col-span-1 lg:col-span-1 border-0 shadow-none' style={{ backgroundColor: '#CDF3D5' }}>
                        <CardContent className='flex flex-col items-center justify-between'>
                          <img src="/images/eye.svg" alt="既読率のアイコン" className="w-6 h-6 mb-2" />
                          <div className='text-4xl font-bold' style={{ color: '#06C42C' }}>
                            {item.expandedContent?.metrics.follows || 0}
                          </div>
                          <div className='text-sm'>既読率</div>
                        </CardContent>
                      </Card>
                    </div>                  
                </div>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>
      
      <ImagePopup 
        isOpen={showSuccessPopup}
        onClose={() => setShowSuccessPopup(false)}
        imageSrc="/images/send-success.svg"
        altText="送信完了"
      />
      
      <ImagePopup 
        isOpen={showErrorPopup}
        onClose={() => setShowErrorPopup(false)}
        imageSrc="/images/send-fail.svg"
        altText="送信失敗"
      />
    </>
  );
}

export function SnsSuggest() {
  const [data, setData] = useState<SnsSuggestItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const posts = await fetchPosts();
        setData(posts);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  // 現在のページに対応するデータを計算
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPageData = data.slice(startIndex, endIndex);
  
  // ページング情報を計算
  const totalPages = Math.ceil(data.length / pageSize);
  const pagination = {
    currentPage: page,
    pageSize,
    totalItems: data.length,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1
  };

  return (
    <>
      <div className="space-y-4">
        {currentPageData.map((item, index) => (
          <SnsSuggestCard key={`${item.id}-${startIndex + index}`} item={item} />
        ))}
      </div>
      {data.length > 0 && (
        <div className="mt-4">
          <SuggestsPagination
            pagination={pagination}
            onPageChange={setPage}
            onPageSizeChange={(size) => {
              setPageSize(size);
              setPage(1);
            }}
          />
        </div>
      )}
    </>
  );
}