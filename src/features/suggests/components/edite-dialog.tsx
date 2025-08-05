import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import { updatePost } from '../api'

interface SnsOption {
  label: string
  value: string
  icon: string
}

const SNS_OPTIONS: SnsOption[] = [
  { label: 'X', value: 'X', icon: '/images/X.svg' },
  { label: 'Instagram', value: 'Instagram', icon: '/images/instagram.svg' },
  { label: 'LINE', value: 'LINE', icon: '/images/LINE.svg' },
]

interface FormValues {
  content: string
  sns: string
}

interface EditDialogProps {
  id?: number
  initialContent?: string
  initialSns?: string
  onSubmit?: (data: FormValues) => void
  onSuccess?: () => void
}

export function EditDialog({ 
  id,
  initialContent = '', 
  initialSns = 'LINE',
  onSubmit: onSubmitProp,
  onSuccess
}: EditDialogProps = {}) {
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)
  
  const { register, handleSubmit, watch, reset, setValue, formState: { errors } } = useForm<FormValues>({
    defaultValues: { content: initialContent, sns: initialSns }
  })

  const selectedSns = watch('sns')

  useEffect(() => {
    if (open) {
      setValue('content', initialContent)
      setValue('sns', initialSns)
    }
  }, [open, initialContent, initialSns, setValue])

  const onSubmit = async (data: FormValues) => {
    if (onSubmitProp) {
      onSubmitProp(data)
      return
    }
    
    if (!id) {
      alert('IDが指定されていません')
      return
    }

    try {
      setIsLoading(true)
      await updatePost(id, {
        content: data.content,
        platform: data.sns
      })
      
      // 成功時の処理
      setOpen(false)
      reset()
      if (onSuccess) {
        onSuccess()
      }
    } catch (error) {
      console.error('Failed to update post:', error)
      alert('更新に失敗しました')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button type="button" className="p-2 rounded hover:bg-blue-100 transition" title="編集">
          <img src="/images/edite.svg" alt="編集" width="32" />
        </button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>投稿編集</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="content">投稿内容</Label>
              <Input id="content" {...register('content', { required: '投稿内容は必須です' })} placeholder="投稿内容を入力" />
              {errors.content && <span className="text-destructive text-xs">{errors.content.message}</span>}
            </div>
            <div className="grid gap-2">
              <Label>SNS選択</Label>
              <RadioGroup 
                value={selectedSns} 
                onValueChange={(value) => setValue('sns', value)}
                className="flex flex-row gap-4"
              >
                {SNS_OPTIONS.map(option => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.value} id={`sns-${option.value}`} />
                    <Label htmlFor={`sns-${option.value}`} className="cursor-pointer flex items-center space-x-1">
                      <img src={option.icon} alt={`${option.label}アイコン`} className="w-6 h-6" />
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              <input type="hidden" {...register('sns', { required: 'SNSを選択してください' })} />
              {errors.sns && <span className="text-destructive text-xs">{errors.sns.message}</span>}
            </div>
          </div>
          <DialogFooter>
            <div className="flex justify-center w-full gap-2">
              <Button 
                type="button" 
                variant="outline" 
                className='w-3/8 rounded-full'
                onClick={() => setOpen(false)}
                disabled={isLoading}
              >
                もどる
              </Button>
              <Button 
                type="submit" 
                className='w-3/8 bg-secondary rounded-full'
                disabled={isLoading}
              >
                {isLoading ? '保存中...' : '保存'}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}