"use client"

import React, { useState, useEffect, useCallback } from "react"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useAuth, useSignIn } from "@clerk/nextjs"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "react-hot-toast"
import { motion } from "framer-motion"
import { Mail, Lock, ArrowRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GoogleAuthButton } from "@/app/(auth)/_components/GoogleSignin"
import { onAuthenticatedUser, onSignInUser } from "@/actions/auth"

const schema = yup
  .object({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
  })
  .required()

type FormData = yup.InferType<typeof schema>

export function CustomSignIn() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
  const { signOut } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [redirected, setRedirected] = useState(false)
  const { isLoaded, signIn, setActive } = useSignIn()
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleSignInError = () => {
    if (redirected) return // Prevent multiple executions
    setRedirected(true)

    toast.error("Account not found. Redirecting to sign-up...")
    const redirectUrl = searchParams.get("redirect_url")
    router.push(`/sign-up${redirectUrl ? `?redirect_url=${redirectUrl}` : ""}`)
  }

  const onSubmit = useCallback(
    async (data: FormData) => {
      if (!isLoaded) return
      setIsLoading(true)

      const user = await onSignInUser({ email: data.email })
      console.log(user)
      try {
        const result = await signIn.create({
          identifier: data.email,
          password: data.password,
        })

        if (result.status === "complete" && user.status === 200) {
          await setActive({ session: result.createdSessionId })
          if (user.role === "TEACHER") {
            const redirectUrl = searchParams.get("redirect_url") || "/dashboard"
            if (redirectUrl !== "/dashboard") {
              toast.success(`${user.message}`)
              router.push(redirectUrl)
            } else {
              toast.success(`${user.message}`)
              router.push("/teacher/courses")
            }
          } else {
            toast.success(`${user.message}`)
            const redirectUrl = searchParams.get("redirect_url") || "/dashboard"
            router.push(redirectUrl)
          }
        } else {
          toast.error("Sign in failed. Please try again.")
        }
      } catch (err: any) {
        await signOut()
        handleSignInError()
      } finally {
        setIsLoading(false)
      }
    },
    [isLoaded, signIn, setActive, router, searchParams],
  )

  useEffect(() => {
    const handleAnimationStart = (e: AnimationEvent) => {
      if (e.animationName === "onAutoFillStart") {
        handleSubmit(onSubmit)()
      }
    }

    const emailInput = document.getElementById("email")
    const passwordInput = document.getElementById("password")

    emailInput?.addEventListener(
      "animationstart",
      handleAnimationStart as EventListener,
    )
    passwordInput?.addEventListener(
      "animationstart",
      handleAnimationStart as EventListener,
    )

    return () => {
      emailInput?.removeEventListener(
        "animationstart",
        handleAnimationStart as EventListener,
      )
      passwordInput?.removeEventListener(
        "animationstart",
        handleAnimationStart as EventListener,
      )
    }
  }, [handleSubmit, onSubmit])

  if (!isLoaded) {
    return null
  }

  return (
    <div className="w-full max-w-md mt-28 mb-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-2xl rounded-2xl overflow-hidden"
      >
        <div className="p-8 space-y-5">
          <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            Sign in to your account
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="text-gray-400" size={20} />
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
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
                    className={`transition-all duration-300 ${errors.email ? "ring-2 ring-red-500" : ""}`}
                  />
                )}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Lock className="text-gray-400" size={20} />
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
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
                    className={`transition-all duration-300 ${errors.password ? "ring-2 ring-red-500" : ""}`}
                  />
                )}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
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
                  Sign in <ArrowRight className="ml-2" size={16} />
                </>
              )}
            </Button>
          </form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or</span>
            </div>
          </div>

          <GoogleAuthButton method="signin" />
        </div>
      </motion.div>
      <style jsx global>{`
        @keyframes onAutoFillStart {
          from {
            /**/
          }
          to {
            /**/
          }
        }

        input:-webkit-autofill {
          animation-name: onAutoFillStart;
          animation-fill-mode: both;
        }
      `}</style>
    </div>
  )
}
