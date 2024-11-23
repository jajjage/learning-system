"use client";

import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { createUser } from "@/actions/createUser";

export function useCustomSignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [code, setCode] = useState("");

  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!isLoaded) return;

    try {
      await signUp.create({
        firstName,
        lastName,
        emailAddress: email,
        password,
      });

      // Send the email
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Change the UI to the pending section
      setVerifying(true);
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      setError(err.errors[0].message);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!isLoaded) return;

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      if (completeSignUp.status !== "complete") {
        console.log(JSON.stringify(completeSignUp, null, 2));
        return;
      }

      // If we get here, the user is signed up and logged in
      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });

        // Create user in our database
        const result = await createUser({
          firstName,
          lastName,
          email,
          clerkId: completeSignUp.createdUserId ?? "",
        });

        if (result.success) {
          router.push("/dashboard"); // Redirect to dashboard after successful sign-up
        } else {
          setError(
            "Failed to create user in database. Please contact support.",
          );
        }
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      setError(err.errors[0].message);
    }
  };

  return {
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
  };
}
