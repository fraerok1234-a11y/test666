"use client"

import { Phone, Mail, MapPin, Clock, Send } from "lucide-react"

export default function ContactSection() {
	return (
		<section id="contact" className="py-20 bg-gray-900 text-white">
			<div className="container mx-auto px-4">
				<div className="grid lg:grid-cols-2 gap-12">
					{/* Contact Info */}
					<div className="space-y-8">
						<div>
							<h2 className="text-4xl font-bold mb-4">
								Зв&apos;яжіться з Нами
							</h2>
							<p className="text-xl text-gray-300">
								Готові відповісти на всі ваші питання та допомогти з вибором
							</p>
						</div>

						<div className="space-y-6">
							<div className="flex items-start space-x-4">
								<div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
									<Phone className="w-6 h-6" />
								</div>
								<div>
									<h3 className="text-lg font-semibold mb-1">Телефон</h3>
									<p className="text-gray-300">+380 99 123 45 67</p>
									<p className="text-gray-300">+380 99 123 45 68</p>
								</div>
							</div>

							<div className="flex items-start space-x-4">
								<div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
									<Mail className="w-6 h-6" />
								</div>
								<div>
									<h3 className="text-lg font-semibold mb-1">Email</h3>
									<p className="text-gray-300">info@printerpro.ua</p>
									<p className="text-gray-300">support@printerpro.ua</p>
								</div>
							</div>

							<div className="flex items-start space-x-4">
								<div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
									<MapPin className="w-6 h-6" />
								</div>
								<div>
									<h3 className="text-lg font-semibold mb-1">Адреса</h3>
									<p className="text-gray-300">
										м. Київ, вул. Хрещатик, 1<br />
										Бізнес-центр &quot;Україна&quot;
									</p>
								</div>
							</div>

							<div className="flex items-start space-x-4">
								<div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
									<Clock className="w-6 h-6" />
								</div>
								<div>
									<h3 className="text-lg font-semibold mb-1">Графік роботи</h3>
									<p className="text-gray-300">Пн-Пт: 9:00 - 18:00</p>
									<p className="text-gray-300">Сб: 10:00 - 16:00</p>
									<p className="text-gray-300">Нд: Вихідний</p>
								</div>
							</div>
						</div>
					</div>

					{/* Contact Form */}
					<div className="bg-gray-800 rounded-xl p-8">
						<h3 className="text-2xl font-bold mb-6">Надішліть повідомлення</h3>

						<form className="space-y-6">
							<div className="grid md:grid-cols-2 gap-4">
								<div>
									<label className="block text-sm font-medium mb-2">
										Ім&apos;я *
									</label>
									<input
										type="text"
										className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 text-white"
										placeholder="Ваше ім&apos;я"
										required
									/>
								</div>
								<div>
									<label className="block text-sm font-medium mb-2">
										Email *
									</label>
									<input
										type="email"
										className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 text-white"
										placeholder="your@email.com"
										required
									/>
								</div>
							</div>

							<div>
								<label className="block text-sm font-medium mb-2">
									Телефон
								</label>
								<input
									type="tel"
									className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 text-white"
									placeholder="+380 99 123 45 67"
								/>
							</div>

							<div>
								<label className="block text-sm font-medium mb-2">
									Тема *
								</label>
								<select className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 text-white">
									<option>Виберіть тему</option>
									<option>Консультація</option>
									<option>Замовлення</option>
									<option>Технічна підтримка</option>
									<option>Інше</option>
								</select>
							</div>

							<div>
								<label className="block text-sm font-medium mb-2">
									Повідомлення *
								</label>
								<textarea
									rows={4}
									className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 text-white resize-none"
									placeholder="Опишіть ваше питання..."
									required
								></textarea>
							</div>

							<button
								type="submit"
								className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
							>
								<Send className="w-5 h-5" />
								<span>Надіслати повідомлення</span>
							</button>
						</form>
					</div>
				</div>
			</div>
		</section>
	)
} 