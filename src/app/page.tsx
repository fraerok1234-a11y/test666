import HeaderSection from "@/components/sections/HeaderSection"
import HeroSection from "@/components/sections/HeroSection"
import ProductsSection from "@/components/sections/ProductsSection"
import FeaturesSection from "@/components/sections/FeaturesSection"
import ContactSection from "@/components/sections/ContactSection"

export default function Home() {
	return (
		<main className="min-h-screen bg-white">
			<HeaderSection />
			<HeroSection />
			<ProductsSection />
			<FeaturesSection />
			<ContactSection />
		</main>
	)
}
