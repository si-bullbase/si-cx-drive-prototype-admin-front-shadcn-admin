import { createFileRoute } from '@tanstack/react-router'
import Suggests from '@/features/suggests'

export const Route = createFileRoute('/_authenticated/suggests/')({
  component: Suggests,
})
