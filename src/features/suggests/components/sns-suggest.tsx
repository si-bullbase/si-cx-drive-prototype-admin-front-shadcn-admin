import { useState } from "react";
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
import { IconHeartHandshake } from "@tabler/icons-react";
import { EditDialog } from './edite-dialog'
import { ImagePopup } from './image-popup'
import { DeletePopup } from './delete-popup'

// interface SnsSuggestProps {
//   id: string;
//   sns: 'LINE' | 'Twitter' | 'Instagram' | 'Facebook';
//   content: string;
//   keywords: string[];
//   target: string;
//   engagementRate: number;
//   impressions: number;
//   reach: number;
//   createdAt: string;
//   expandedContent?: {
//     fullText: string;
//     reasoning: string;
//     metrics: {
//       participants: number;
//       comments: number;
//       shares: number;
//       saves: number;
//       clicks: number;
//       follows: number;
//     };
//   };
//   onSend?: (id: string) => void;
//   onEdit?: (id: string) => void;
//   onDelete?: (id: string) => void;
// }

// interface Target {
//   id: string;
//   label: string;
//   borderColor: string;
// }

// const targets: Target[] = [
//   { id: 'executive', label: '経営者・役員', borderColor: 'border-purple-500' },
//   { id: 'manager', label: '管理職', borderColor: 'border-blue-500' },
//   { id: 'engineer', label: 'エンジニア', borderColor: 'border-green-500' },
//   { id: 'sales', label: 'セール・営業', borderColor: 'border-yellow-500' },
//   { id: 'marketing', label: 'マーケティング', borderColor: 'border-red-500' },
//   { id: 'hr', label: '人事・採用', borderColor: 'border-orange-500' },
// ];




export function SnsSuggest() {
  const [open, setOpen] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const handleSend = async () => {
    try {
      // 実際の送信処理をここに実装
      // 例: await sendSnsPost(postData);
      
      // 成功時のポップアップ
      setShowSuccessPopup(true);
    } catch (error) {
      // 失敗時のポップアップ
      setShowErrorPopup(true);
    }
  };

  return (
    <>
    <Collapsible open={open} onOpenChange={setOpen} className="py-2">
        <Card>
          <div className={`grid grid-cols-[4%_36%_12%_20%_16%_20%] items-center ${open ? ' border-b' : ''}`}>
            {/* SNSアイコン */}
            <div className="flex justify-center">
              {/* 例: LINEアイコン */}
              <img src="/images/LINE.svg" alt="LINE" width="24" />
            </div>
            {/* 投稿内容・キーワード */}
            <div>
              <div className="line-clamp-2">展示会で注目の生成AIツール「CXDrive」！来場者の皆様からの熱い質問が続々と...「ROIはどのくらい改善できる？」「導入までの期間は？」</div>
              <div className="flex gap-1 mt-1">
                {/* ラベル */}
                <span className="bg-primary rounded px-2 py-0.5 text-s">生成AI</span>
                <span className="bg-primary rounded px-2 py-0.5 text-s">ファッション</span>
              </div>
            </div>
            {/* ターゲット */}
            <div className="flex items-center justify-center">
              <span className="border rounded px-2 py-1 text-xs border-red-500">マーケティング担当</span>
            </div>
            {/* 予測エンゲージメント */}
            <div>
              <ul className="pl-2 space-y-1">
                <li className="py-0.5"><span className="text-green-500 font-bold">・</span>エンゲージメント率 5.4%</li>
                <li className="py-0.5"><span className="text-green-500 font-bold">・</span>インプレッション数 5,000</li>
                <li className="py-0.5"><span className="text-green-500 font-bold">・</span>配信対象数 120</li>
              </ul>
            </div>
            {/* アクション */}
            <div className="flex gap-2 justify-center">
              {/* 送信ボタン */}
              <button type="button" className="p-2 rounded hover:bg-green-100 transition" title="送信" onClick={handleSend}>
                <img src="/images/send.svg" alt="送信" width="32" />
              </button>
              {/* 編集ボタン → EditeDialogで置き換え */}
              <EditDialog />
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
                
                {/* 左側（60%） */}
                <div>
                  <div className="grid grid-cols- gap-4 h-2/5">
                    <div className='flex flex-col justify-between '>

                      <div>以下は140文字の例文です（全角140文字）：

展示会で話題の生成AIツール「CXDrive」をご紹介！来場者からは「ROIはどのくらい改善できる？」「導入期間は？」など熱い質問が続々。AI活用で業務効率化や新たな価値創出が期待されます。今後の展開にもご注目ください！</div>
                    </div>
                  </div>
                  
                  <div className="grid  h-3/5">
                    <div className='flex flex-col justify-between'>
                      <Card className="bg-gray-100">
                        <CardHeader>
                          <CardTitle>
                            投稿の狙いと根拠
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div>
                            展示会で話題の生成AIツール「CXDrive」をご紹介！来場者からは「ROIはどのくらい改善できる？」「導入期間は？」など熱い質問が続々。AI活用で業務効率化や新たな価値創出が期待されます。今後の展開にもご注目ください！
                          </div>
                        </CardContent>
                      </Card>
                    
                    </div>
                  </div>
                </div>
                {/* 右側（40%） */}
                <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <Card className='col-span-1 lg:col-span-1' style={{ backgroundColor: '#CDF3D5' }}>
                        <CardContent className='flex flex-col items-center justify-between'>
                          <IconHeartHandshake className='w-6 h-6' />
                          <div className='text-4xl font-bold' style={{ color: '#06C42C' }}>1234人</div>
                          <div className='text-sm'>参加人数</div>
                        </CardContent>
                      </Card>
                      <Card className='col-span-1 lg:col-span-1' style={{ backgroundColor: '#CDF3D5' }}>
                        <CardContent className='flex flex-col items-center justify-between'>
                          <IconHeartHandshake className='w-6 h-6' />
                          <div className='text-4xl font-bold' style={{ color: '#06C42C' }}>567</div>
                          <div className='text-sm'>コメント数</div>
                        </CardContent>
                      </Card>
                      <Card className='col-span-1 lg:col-span-1' style={{ backgroundColor: '#CDF3D5' }}>
                        <CardContent className='flex flex-col items-center justify-between'>
                          <IconHeartHandshake className='w-6 h-6' />
                          <div className='text-4xl font-bold' style={{ color: '#06C42C' }}>890</div>
                          <div className='text-sm'>シェア数</div>
                        </CardContent>
                      </Card>
                      <Card className='col-span-1 lg:col-span-1' style={{ backgroundColor: '#CDF3D5' }}>
                        <CardContent className='flex flex-col items-center justify-between'>
                          <IconHeartHandshake className='w-6 h-6' />
                          <div className='text-4xl font-bold' style={{ color: '#06C42C' }}>234</div>
                          <div className='text-sm'>保存数</div>
                        </CardContent>
                      </Card>
                      <Card className='col-span-1 lg:col-span-1' style={{ backgroundColor: '#CDF3D5' }}>
                        <CardContent className='flex flex-col items-center justify-between'>
                          <IconHeartHandshake className='w-6 h-6' />
                          <div className='text-4xl font-bold' style={{ color: '#06C42C' }}>567</div>
                          <div className='text-sm'>クリック数</div>
                        </CardContent>
                      </Card>
                      <Card className='col-span-1 lg:col-span-1' style={{ backgroundColor: '#CDF3D5' }}>
                        <CardContent className='flex flex-col items-center justify-between'>
                          <IconHeartHandshake className='w-6 h-6' />
                          <div className='text-4xl font-bold' style={{ color: '#06C42C' }}>890</div>
                          <div className='text-sm'>フォロー数</div>
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