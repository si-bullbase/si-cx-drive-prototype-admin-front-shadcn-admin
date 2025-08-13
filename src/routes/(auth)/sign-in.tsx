import { createFileRoute, redirect } from '@tanstack/react-router'
import { z } from 'zod'
import SignIn from '@/features/auth/sign-in'

const signInSearchSchema = z.object({
  redirect: z.string().optional(),
})

export const Route = createFileRoute('/(auth)/sign-in')({
  validateSearch: signInSearchSchema,
  component: SignIn,
})
