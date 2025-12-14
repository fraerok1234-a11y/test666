"use client"

import { Zap, Shield, Clock, Users, Award, Headphones } from "lucide-react"

const features = [
	{
		icon: Zap,
		title: "Швидкий Друк",
		description: "Наші принтери забезпечують високу швидкість друку без втрати якості"
	},
	{
		icon: Shield,
		title: "Надійність",
		description: "Провірена технологія та якісні матеріали для довговічної роботи"
	},
	{
		icon: Clock,
		title: "24/7 Підтримка",
		description: "Наша команда завжди готова допомогти вам з будь-якими питаннями"
	},
	{
		icon: Users,
		title: "Експертна Консультація",
		description: "Отримайте професійну пораду від наших спеціалістів"
	},
	{
		icon: Award,
		title: "Гарантія Якості",
		description: "Всі наші продукти мають повну гарантію та сервісне обслуговування"
	},
	{
		icon: Headphones,
		title: "Технічна Підтримка",
		description: "Допомога з налаштуванням та вирішенням технічних проблем"
	}
]

export default function FeaturesSection() {
	return (
		<section className="py-20 bg-gray-50">
			<div className="container mx-auto px-4">
				{/* Header */}
				<div className="text-center mb-16">
					<h2 className="text-4xl font-bold text-gray-900 mb-4">
						Чому Обирають Нас
					</h2>
					<p className="text-xl text-gray-600 max-w-2xl mx-auto">
						Ми пропонуємо найкращі рішення для 3D друку з неперевершеним сервісом
					</p>
				</div>

				{/* Features Grid */}
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
					{features.map((feature, index) => (
						<div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
							<div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
								<feature.icon className="w-8 h-8 text-blue-600" />
							</div>

							<h3 className="text-xl font-semibold text-gray-900 mb-4">
								{feature.title}
							</h3>

							<p className="text-gray-600 leading-relaxed">
								{feature.description}
							</p>
						</div>
					))}
				</div>

				{/* Stats Section */}
				<div className="mt-20 bg-white rounded-2xl p-8 shadow-lg">
					<div className="grid md:grid-cols-4 gap-8 text-center">
						<div>
							<div className="text-4xl font-bold text-blue-600 mb-2">5+</div>
							<div className="text-gray-600">Років досвіду</div>
						</div>
						<div>
							<div className="text-4xl font-bold text-blue-600 mb-2">1000+</div>
							<div className="text-gray-600">Проданих принтерів</div>
						</div>
						<div>
							<div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
							<div className="text-gray-600">Задоволених клієнтів</div>
						</div>
						<div>
							<div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
							<div className="text-gray-600">Підтримка</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
} 