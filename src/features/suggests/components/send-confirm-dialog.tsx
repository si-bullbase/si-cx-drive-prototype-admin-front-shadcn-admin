import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface SendConfirmDialogProps {
  onConfirm: () => void
  children: React.ReactNode
}

export function SendConfirmDialog({ onConfirm, children }: SendConfirmDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>送信確認</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-center">送信してもよろしいですか？</p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <div className="flex justify-center w-full gap-2">
              <Button type="button" variant="outline" className='w-3/8 rounded-full'>戻る</Button>
              <Button 
                type="button" 
                className='w-3/8 bg-secondary rounded-full'
                onClick={onConfirm}
              >
                送信
              </Button>
            </div>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}