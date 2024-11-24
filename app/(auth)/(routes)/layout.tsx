import React from "react";
import { Toaster } from "react-hot-toast";

const UserLayout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
  <div className="w-full max-w-md space-y-8">
    {children}
    <Toaster position="top-right" />
  </div>
</div>

};

export default UserLayout;

