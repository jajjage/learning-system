'use client'

import React, { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useSignUp } from '@clerk/nextjs'
import { useRouter, useSearchParams } from 'next/navigation'
import OtpInput from 'react-otp-input'
import { toast } from 'react-hot-toast'
import { motion } from 'framer-motion'
import { User, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { GoogleSignIn } from '@/app/(auth)/_components/GoogleSignin'


const schema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
}).required()

type FormData = yup.InferType<typeof schema>

export function CustomSignUp() {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    }
  })

  const [isLoading, setIsLoading] = useState(false)
  const [verifying, setVerifying] = useState(false)
  const [otp, setOtp] = useState('')
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()
  const searchParams = useSearchParams()

  const onSubmit = async (data: FormData) => {
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
      if (err.errors[0].code === 'form_identifier_exists') {
        toast.error('An account with this email already exists. Redirecting to sign-in...')
        const redirectUrl = searchParams.get('redirect_url')
        router.push(`/sign-in${redirectUrl ? `?redirect_url=${redirectUrl}` : ''}`)
      } else {
        toast.error(err.errors[0].message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerify = async () => {
    if (!isLoaded) return
    setIsLoading(true)

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: otp,
      })

      if (completeSignUp.status !== "complete") {
        console.log(JSON.stringify(completeSignUp, null, 2))
        throw new Error("Unable to complete sign up")
      }

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId })
        toast.success('Sign up successful!')
        const redirectUrl = searchParams.get('redirect_url') || '/dashboard'
        router.push(redirectUrl)
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2))
      toast.error(err.errors[0].message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (otp.length === 6) {
      handleVerify()
    }
  }, [otp])

  if (!isLoaded) {
    return null
  }

  return (
    <div className="w-full max-w-md">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-2xl rounded-2xl overflow-hidden"
      >
        <div className="p-8">
          <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            Create an account
          </h2>
          {!verifying ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <User className="text-gray-400" size={20} />
                  <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                    First Name
                  </Label>
                </div>
                <Controller
                  name="firstName"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="firstName"
                      type="text"
                      className={`transition-all duration-300 ${errors.firstName ? 'ring-2 ring-red-500' : ''}`}
                    />
                  )}
                />
                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <User className="text-gray-400" size={20} />
                  <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                    Last Name
                  </Label>
                </div>
                <Controller
                  name="lastName"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="lastName"
                      type="text"
                      className={`transition-all duration-300 ${errors.lastName ? 'ring-2 ring-red-500' : ''}`}
                    />
                  )}
                />
                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName
.message}</p>}
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Mail className="text-gray-400" size={20} />
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email address
                  </Label>
                </div>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="email"
                      type="email"
                      className={`transition-all duration-300 ${errors.email ? 'ring-2 ring-red-500' : ''}`}
                    />
                  )}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Lock className="text-gray-400" size={20} />
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password
                  </Label>
                </div>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="password"
                      type="password"
                      className={`transition-all duration-300 ${errors.password ? 'ring-2 ring-red-500' : ''}`}
                    />
                  )}
                />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  <>
                    Sign up <ArrowRight className="ml-2" size={16} />
                  </>
                )}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or</span>
                </div>
              </div>

              <GoogleSignIn />
            </form>
          ) : (
            <div className="space-y-4">
              <p className="text-center text-gray-700">Enter the verification code sent to your email</p>
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderSeparator={<span className="w-2"></span>}
                renderInput={(props) => <Input {...props} className="!w-12 text-center" />}
                inputStyle="inputStyle"
                containerStyle="flex justify-center space-x-2"
              />
              {isLoading && (
                <div className="flex justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

