import { CustomSignIn } from "../_components/CustomSignIn";


export default function SignInPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gradient-to-br from-purple-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <CustomSignIn />
    </div>
  )
}

