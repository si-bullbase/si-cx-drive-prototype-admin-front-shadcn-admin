import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useForm } from 'react-hook-form'

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
  initialContent?: string
  initialSns?: string
  onSubmit?: (data: FormValues) => void
}

export function EditDialog({ 
  initialContent = '', 
  initialSns = 'LINE',
  onSubmit: onSubmitProp 
}: EditDialogProps = {}) {
  const { register, handleSubmit, watch, reset, setValue, formState: { errors } } = useForm<FormValues>({
    defaultValues: { content: initialContent, sns: initialSns }
  })

  const selectedSns = watch('sns')

  const onSubmit = (data: FormValues) => {
    if (onSubmitProp) {
      onSubmitProp(data)
    } else {
      alert(JSON.stringify(data, null, 2))
    }
    reset()
  }

  return (
    <Dialog>
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
            <DialogClose asChild>
              <div className="flex justify-center w-full gap-2">
                
                <Button type="button" variant="outline" className='w-3/8 rounded-full'>もどる</Button>
                <Button type="submit" className='w-3/8 bg-secondary rounded-full'>保存</Button>
              </div>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}