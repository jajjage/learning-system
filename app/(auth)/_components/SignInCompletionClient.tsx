'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { Spinner } from '@/components/ui/spinner'

interface SignInCompletionClientProps {
  isNewUser: boolean
  error?: string
}

export default function SignInCompletionClient({ isNewUser, error }: SignInCompletionClientProps) {
  const router = useRouter()

  useEffect(() => {
    if (error) {
      toast.error(error)
      router.push('/sign-in')
    } else {
      if (isNewUser) {
        toast.success('Account created successfully!')
      } else {
        toast.success('Welcome back!')
      }
      router.push('/dashboard')
    }
  }, [isNewUser, error, router])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Spinner className="mb-4" />
      <p className="text-lg text-gray-600">
        {error ? 'Redirecting to sign-in...' : 'Redirecting to dashboard...'}
      </p>
    </div>
  )
}



