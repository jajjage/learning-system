import type { Metadata } from "next"
import "./globals.css"
import { ClerkProvider } from "@clerk/nextjs"
import { Toaster } from "react-hot-toast"
import { Header } from "@/components/global/landing-page/Header"
import ToastProvider from "@/components/providers/toaster"
import { ReactQueryProvider } from "@/react-query/provider"

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}
interface PageProps {
  children: React.ReactNode
  params: string // Adjust based on your dynamic routes
}
export default function RootLayout({ children, params }: PageProps) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Header onPage={"/"} />
          <ToastProvider />
          {/* <ReduxProvider> */}
          <ReactQueryProvider>{children}</ReactQueryProvider>
          {/* </ReduxProvider> */}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  )
}
