import { Hero } from "@/components/hero";
import { Example } from "@/components/example";
import { HowItWorks } from "@/components/bento/how-it-works";

export default function Home() {
  return (
    <div className="max-w-[96rem] mx-auto px-4 flex flex-col">
      <Hero />
      <Example />
      <HowItWorks />
    </div>
  )
}
