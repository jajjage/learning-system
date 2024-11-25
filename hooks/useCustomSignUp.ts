'use client'

import { useState, useCallback } from 'react'
import { useSignUp } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { onSignUpUser } from '@/actions/auth'

export function useCustomSignUp() {
  const [isLoading, setIsLoading] = useState(false)
  const [verifying, setVerifying] = useState(false)
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  const handleSubmit = useCallback(async (data: {
    firstName: string
    lastName: string
    email: string
    password: string
  }) => {
    if (!isLoaded) return
    setIsLoading(true)

    try {
      await signUp.create({
        firstName: data.firstName,
        lastName: data.lastName,
        emailAddress: data.email,
        password: data.password,
      })

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" })
      setVerifying(true)
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2))
      if (err.errors?.[0]?.code === 'form_identifier_exists') {
        toast.error('An account with this email already exists. Redirecting to sign-in...')
        router.push('/sign-in')
      } else {
        toast.error(err.errors?.[0]?.message || 'An error occurred during sign up.')
      }
    } finally {
      setIsLoading(false)
    }
  }, [isLoaded, signUp, router])

  const handleVerify = useCallback(async () => {
    if (!isLoaded) return
    setIsLoading(true)

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: otp.join(''),
      })

      if (completeSignUp.status !== "complete") {
        console.log(JSON.stringify(completeSignUp, null, 2))
        throw new Error("Unable to complete sign up")
      }

      await setActive({ session: completeSignUp.createdSessionId })
      
      const result = await onSignUpUser({
        firstName: signUp.firstName ?? '',
        lastName: signUp.lastName ?? '',
        email: signUp.emailAddress ?? '',
        clerkId: completeSignUp.createdUserId ?? '',
      })

      if (result.status == 200) {
        toast.success('Sign up successful!')
        router.push('/dashboard')
      } else {
        toast.error('Failed to create user in database. Please contact support.')
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2))
      if (err.errors?.[0]?.code === 'form_code_incorrect') {
        toast.error('Incorrect verification code. Please try again.')
        setOtp(['', '', '', '', '', ''])
      } else {
        toast.error(err.errors?.[0]?.message || 'An error occurred during verification.')
      }
    } finally {
      setIsLoading(false)
    }
  }, [isLoaded, signUp, otp, setActive, router])

  const handleOtpChange = useCallback((index: number, value: string) => {
    setOtp(prev => {
      const newOtp = [...prev]
      newOtp[index] = value
      return newOtp
    })
  }, [])

  return {
    isLoading,
    verifying,
    setVerifying,
    otp,
    handleOtpChange,
    isLoaded,
    handleSubmit,
    handleVerify
  }
}
