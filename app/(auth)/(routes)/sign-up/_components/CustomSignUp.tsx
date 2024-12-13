"use client"
import * as yup from "yup"
import { motion } from "framer-motion"
import { User, Mail, Lock, ArrowRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCustomSignUp } from "@/hooks/useCustomSignUp"
import { GoogleAuthButton } from "@/app/(auth)/_components/GoogleSignin"
import Link from "next/link"
import OtpVerification from "@/components/global/OtpVerification"
import FormField from "@/components/global/FormField"
import { useEffect, useRef } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

const schema = yup
  .object({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  })
  .required()

type FormData = yup.InferType<typeof schema>

export function CustomSignUp() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  })

  const {
    isLoading,
    verifying,
    setVerifying,
    otp,
    handleOtpChange,
    isLoaded,
    handleSubmit: onSubmit,
    handleVerify,
  } = useCustomSignUp()

  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    if (verifying) {
      otpInputRefs.current[0]?.focus()
    }
  }, [verifying])

  useEffect(() => {
    if (otp.every((digit) => digit !== "")) {
      handleVerify()
    }
  }, [otp, handleVerify])

  const handleOtpInputChange = (index: number, value: string) => {
    const sanitizedValue = value.replace(/[^0-9]/g, "")
    handleOtpChange(index, sanitizedValue)

    if (sanitizedValue && index < otp.length - 1) {
      otpInputRefs.current[index + 1]?.focus()
    }
  }

  const handleOtpKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus()
    }
  }

  if (!isLoaded) {
    return null
  }

  return (
    <div className="w-full max-w-md mt-28 mb-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-2xl rounded-2xl overflow-hidden"
      >
        <div className="flex flex-col p-8 min-h-40">
          <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            Create an account
          </h2>
          {!verifying ? (
            <div className="space-y-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  name="firstName"
                  label="First Name"
                  icon={User}
                  control={control}
                  errors={errors}
                />
                <FormField
                  name="lastName"
                  label="Last Name"
                  icon={User}
                  control={control}
                  errors={errors}
                />
                <FormField
                  name="email"
                  label="Email address"
                  icon={Mail}
                  control={control}
                  errors={errors}
                />
                <FormField
                  name="password"
                  label="Password"
                  icon={Lock}
                  control={control}
                  errors={errors}
                  type="password"
                />

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
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or</span>
                </div>
              </div>

              <GoogleAuthButton method="signup" />
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link
                  href="/sign-in"
                  className="font-medium text-purple-600 hover:text-purple-500"
                >
                  Sign in
                </Link>
              </div>
            </div>
          ) : (
            <OtpVerification
              otp={otp}
              isLoading={isLoading}
              handleOtpInputChange={handleOtpInputChange}
              handleOtpKeyDown={handleOtpKeyDown}
              otpInputRefs={otpInputRefs}
              setVerifying={setVerifying}
            />
          )}
        </div>
      </motion.div>
    </div>
  )
}
