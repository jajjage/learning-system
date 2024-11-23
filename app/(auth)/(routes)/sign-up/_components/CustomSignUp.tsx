"use client";

import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { useCustomSignUp } from "@/hooks/useCustomSignUp";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { motion } from "framer-motion";
import { User, Mail, Lock, ArrowRight } from "lucide-react";

export function CustomSignUp() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    error,
    verifying,
    code,
    setCode,
    isLoaded,
    handleSubmit,
    handleVerify,
  } = useCustomSignUp();

  const [focused, setFocused] = useState<string | null>(null);

  if (!isLoaded) {
    return null;
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
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <User className="text-gray-400" size={20} />
                  <Label
                    htmlFor="firstName"
                    className="text-sm font-medium text-gray-700"
                  >
                    First Name
                  </Label>
                </div>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  onFocus={() => setFocused("firstName")}
                  onBlur={() => setFocused(null)}
                  className={`transition-all duration-300 ${
                    focused === "firstName" ? "ring-2 ring-purple-500" : ""
                  }`}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <User className="text-gray-400" size={20} />
                  <Label
                    htmlFor="lastName"
                    className="text-sm font-medium text-gray-700"
                  >
                    Last Name
                  </Label>
                </div>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  onFocus={() => setFocused("lastName")}
                  onBlur={() => setFocused(null)}
                  className={`transition-all duration-300 ${
                    focused === "lastName" ? "ring-2 ring-purple-500" : ""
                  }`}
                />
              </div>
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
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused(null)}
                  className={`transition-all duration-300 ${
                    focused === "email" ? "ring-2 ring-purple-500" : ""
                  }`}
                />
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
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocused("password")}
                  onBlur={() => setFocused(null)}
                  className={`transition-all duration-300 ${
                    focused === "password" ? "ring-2 ring-purple-500" : ""
                  }`}
                />
              </div>
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
              >
                Sign up <ArrowRight className="ml-2" size={16} />
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerify} className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Lock className="text-gray-400" size={20} />
                  <Label
                    htmlFor="code"
                    className="text-sm font-medium text-gray-700"
                  >
                    Verification Code
                  </Label>
                </div>
                <Input
                  id="code"
                  name="code"
                  type="text"
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  onFocus={() => setFocused("code")}
                  onBlur={() => setFocused(null)}
                  className={`transition-all duration-300 ${
                    focused === "code" ? "ring-2 ring-purple-500" : ""
                  }`}
                />
              </div>
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
              >
                Verify Email <ArrowRight className="ml-2" size={16} />
              </Button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
