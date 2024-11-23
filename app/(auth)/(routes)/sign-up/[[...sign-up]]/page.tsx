import { SignUp } from "@clerk/nextjs";
import { CustomSignUp } from "../_components/CustomSignUp";

const SignUpPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <CustomSignUp />
    </div>
  );
};

export default SignUpPage;
