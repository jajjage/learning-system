import { Loader2 } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { FormField } from "../ui/form"

interface OtpVerificationProps {
  otp: string[]
  isLoading: boolean
  handleOtpInputChange: (index: number, value: string) => void
  handleOtpKeyDown: (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => void
  otpInputRefs: React.MutableRefObject<(HTMLInputElement | null)[]>
  setVerifying: (value: boolean) => void
}

function OtpVerification({
  otp,
  isLoading,
  handleOtpInputChange,
  handleOtpKeyDown,
  otpInputRefs,
  setVerifying,
}: OtpVerificationProps) {
  return (
    <div className="space-y-4">
      <p className="text-center text-gray-700">
        Enter the verification code sent to your email
      </p>
      <div className="flex justify-center space-x-2">
        {otp.map((digit, index) => (
          <Input
            key={index}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleOtpInputChange(index, e.target.value)}
            onKeyDown={(e) => handleOtpKeyDown(index, e)}
            ref={(el) => {
              otpInputRefs.current[index] = el
            }}
            className="w-12 h-12 text-center text-2xl"
            aria-label={`OTP digit ${index + 1}`}
            aria-invalid={digit === ""}
          />
        ))}
      </div>
      {isLoading && (
        <div className="flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
        </div>
      )}
      <div className="mt-4 flex justify-center">
        <Button
          variant="outline"
          onClick={() => setVerifying(false)}
          className="w-full max-w-[200px]"
        >
          Back to Sign Up
        </Button>
      </div>
    </div>
  )
}

export default OtpVerification
