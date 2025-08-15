import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { IconSend } from '@tabler/icons-react'
import type { SnsSuggestApiResponse } from '../types'
import { SendConfirmDialog } from '../../suggests/components/send-confirm-dialog'
import { ImagePopup } from '../../suggests/components/image-popup'
import { sendLineBroadcast } from '../../suggests/api'

interface Props {
  data: SnsSuggestApiResponse
}

export function SnsSuggestRankingCard({ data }: Props) {
  const [showSuccessPopup, setShowSuccessPopup] = useState(false)
  const [showErrorPopup, setShowErrorPopup] = useState(false)

  const handleSendConfirm = async (id: number) => {
    try {
      await sendLineBroadcast(id)
      setShowSuccessPopup(true)
    } catch (error) {
      console.error('Failed to send broadcast:', error)
      setShowErrorPopup(true)
    }
  }

  return (
    <>
      <Card className="w-full  mx-auto">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="flex items-center space-x-2">
            <img src="/images/LINE.svg" alt="LINE" width="24" />
            <CardTitle className="text-xl font-bold">サジェストランキング</CardTitle>
          </div>
          <span className="text-xs text-gray-400">00:00 更新</span>
        </CardHeader>
        <CardContent className="space-y-3 pt-0">
          {(data?.items || data || []).map((item, index) => (
            <div key={item.id} className="flex items-center bg-gray-50 rounded-lg p-3">
              <div className="flex flex-col items-center mr-3 min-w-[2.5rem]">
                <span className="text-green-600 font-bold text-lg">{index + 1}位</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <div className="text-sm font-medium text-gray-900 line-clamp-3 flex-1">{item.content}</div>

                  <Badge className="bg-green-500 text-white text-xs font-bold px-2 py-0.5 hidden sm:inline-flex">
                    開封率：{item.engagement?.rate || 'N/A'}
                  </Badge>
                </div>
              </div>
                <div className="hidden sm:block">
                  <SendConfirmDialog onConfirm={() => handleSendConfirm(item.id)}>
                    <button className="ml-3 p-2 rounded-full border border-green-200 hover:bg-green-50 transition">
                      <IconSend size={20} className="text-green-500" />
                    </button>
                  </SendConfirmDialog>
                </div>
            </div>
          ))}
        </CardContent>
        
      </Card>
      
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
  )
}