"use client"

import { Menu, Phone, Mail } from "lucide-react"

export default function HeaderSection() {
	return (
		<header className="bg-white shadow-sm border-b">
			<div className="container mx-auto px-4">
				<div className="flex items-center justify-between h-16">
					{/* Logo */}
					<div className="flex items-center space-x-2">
						<div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
							<span className="text-white font-bold text-sm">3D</span>
						</div>
						<span className="text-xl font-bold text-gray-900">PrinterPro</span>
					</div>

					{/* Navigation */}
					<nav className="hidden md:flex items-center space-x-8">
						<a href="#home" className="text-gray-700 hover:text-blue-600 transition-colors">
							Головна
						</a>
						<a href="#products" className="text-gray-700 hover:text-blue-600 transition-colors">
							Продукти
						</a>
						<a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">
							Про нас
						</a>
						<a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">
							Контакти
						</a>
					</nav>

					{/* Contact Info */}
					<div className="hidden lg:flex items-center space-x-4">
						<div className="flex items-center space-x-2 text-sm text-gray-600">
							<Phone className="w-4 h-4" />
							<span>+380 99 123 45 67</span>
						</div>
						<div className="flex items-center space-x-2 text-sm text-gray-600">
							<Mail className="w-4 h-4" />
							<span>info@printerpro.ua</span>
						</div>
					</div>

					{/* Mobile Menu */}
					<button className="md:hidden p-2">
						<Menu className="w-6 h-6 text-gray-700" />
					</button>
				</div>
			</div>
		</header>
	)
} 