import Header from "@/components/header"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Services } from "@/components/services"
import { Testimonials } from "@/components/testimonials"
import { Partners } from "@/components/partners"
import { Team } from "@/components/team"
import { CallToAction } from "@/components/call-to-action"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <About />
      <Services />
      <Testimonials />
      <Partners />
      <Team />
      <CallToAction />
      <Footer />
    </main>
  )
}
