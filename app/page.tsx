import { FAQ } from "@/components/global/landing-page/FAQS"
import { Features } from "@/components/global/landing-page/Features"
import { Header } from "@/components/global/landing-page/Header"
import { Hero } from "@/components/global/landing-page/Hero"
import { Testimonials } from "@/components/global/landing-page/Testimonials"

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Features />
        <Testimonials />
        <FAQ />
      </main>
    </div>
  )
}

export default App
