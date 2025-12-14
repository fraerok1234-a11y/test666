"use client"

import { Star, ShoppingCart, Eye } from "lucide-react"
import Image from "next/image"

const products = [
	{
		id: 1,
		name: "3D Printer Pro X1",
		price: "25,000 грн",
		rating: 4.8,
		reviews: 127,
		image: "/images/Frame 39.jpg",
		features: ["Висока точність", "Швидкий друк", "Великий об'єм"]
	},
	{
		id: 2,
		name: "3D Printer Mini",
		price: "15,000 грн",
		rating: 4.6,
		reviews: 89,
		image: "/images/Frame 39-1.jpg",
		features: ["Компактний", "Економний", "Легкий у використанні"]
	},
	{
		id: 3,
		name: "3D Printer Industrial",
		price: "45,000 грн",
		rating: 4.9,
		reviews: 203,
		image: "/images/Frame 39-2.jpg",
		features: ["Промисловий рівень", "Метали", "Великі об'єми"]
	},
	{
		id: 4,
		name: "3D Scanner Pro",
		price: "18,000 грн",
		rating: 4.7,
		reviews: 156,
		image: "/images/Frame 39-3.jpg",
		features: ["3D сканування", "Висока точність", "Швидке сканування"]
	}
]

export default function ProductsSection() {
	return (
		<section id="products" className="py-20 bg-white">
			<div className="container mx-auto px-4">
				{/* Header */}
				<div className="text-center mb-16">
					<h2 className="text-4xl font-bold text-gray-900 mb-4">
						Наші Продукти
					</h2>
					<p className="text-xl text-gray-600 max-w-2xl mx-auto">
						Виберіть ідеальний 3D принтер для ваших потреб.
						Від початківців до професіоналів.
					</p>
				</div>

				{/* Products Grid */}
				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
					{products.map((product) => (
						<div key={product.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
							{/* Image */}
							<div className="relative h-48 overflow-hidden">
								<Image
									src={product.image}
									alt={product.name}
									fill
									className="object-cover group-hover:scale-105 transition-transform duration-300"
								/>
								<div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>

								{/* Quick Actions */}
								<div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
									<button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-50 transition-colors">
										<Eye className="w-5 h-5 text-gray-700" />
									</button>
									<button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-50 transition-colors">
										<ShoppingCart className="w-5 h-5 text-gray-700" />
									</button>
								</div>
							</div>

							{/* Content */}
							<div className="p-6">
								<h3 className="text-lg font-semibold text-gray-900 mb-2">
									{product.name}
								</h3>

								{/* Rating */}
								<div className="flex items-center space-x-2 mb-3">
									<div className="flex items-center space-x-1">
										{[...Array(5)].map((_, i) => (
											<Star
												key={i}
												className={`w-4 h-4 ${i < Math.floor(product.rating)
														? "text-yellow-400 fill-current"
														: "text-gray-300"
													}`}
											/>
										))}
									</div>
									<span className="text-sm text-gray-600">
										({product.reviews})
									</span>
								</div>

								{/* Features */}
								<div className="space-y-1 mb-4">
									{product.features.map((feature, index) => (
										<div key={index} className="text-sm text-gray-600 flex items-center">
											<div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></div>
											{feature}
										</div>
									))}
								</div>

								{/* Price and Button */}
								<div className="flex items-center justify-between">
									<div className="text-2xl font-bold text-blue-600">
										{product.price}
									</div>
									<button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
										Замовити
									</button>
								</div>
							</div>
						</div>
					))}
				</div>

				{/* View All Button */}
				<div className="text-center mt-12">
					<button className="bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
						Переглянути всі продукти
					</button>
				</div>
			</div>
		</section>
	)
} 