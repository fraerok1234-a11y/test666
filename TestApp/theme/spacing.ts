export const spacing = {
	// Базовые отступы
	xs: 4,
	sm: 8,
	md: 16,
	lg: 24,
	xl: 32,
	xxl: 48,

	// Специальные отступы
	screen: {
		horizontal: 20,
		vertical: 20,
	},

	// Отступы для карточек
	card: {
		padding: 20,
		margin: 15,
		borderRadius: 12,
	},

	// Отступы для кнопок
	button: {
		padding: 18,
		margin: 10,
		borderRadius: 12,
	},

	// Отступы для элементов форм
	input: {
		padding: 15,
		margin: 12,
		borderRadius: 10,
	},

	// Отступы для заголовков
	header: {
		marginBottom: 30,
		paddingTop: 20,
	},

	// Отступы для секций
	section: {
		marginVertical: 20,
		paddingHorizontal: 20,
	},

	// Отступы для списков
	list: {
		itemSpacing: 12,
		sectionSpacing: 20,
	},

	// Отступы для модальных окон
	modal: {
		padding: 25,
		margin: 20,
		borderRadius: 15,
	},
} as const;

export const sizes = {
	// Размеры шрифтов
	font: {
		xs: 12,
		sm: 14,
		md: 16,
		lg: 18,
		xl: 20,
		xxl: 24,
		xxxl: 28,
		display: 36,
	},

	// Размеры иконок
	icon: {
		xs: 16,
		sm: 20,
		md: 24,
		lg: 32,
		xl: 48,
		xxl: 64,
	},

	// Высота элементов
	height: {
		button: 48,
		input: 44,
		card: 100,
		header: 60,
	},

	// Ширина элементов
	width: {
		button: '100%',
		card: '100%',
		progress: '100%',
	},

	// Радиусы скругления
	radius: {
		xs: 4,
		sm: 8,
		md: 12,
		lg: 16,
		xl: 20,
		round: 50,
	},

	// Толщина границ
	border: {
		thin: 1,
		normal: 2,
		thick: 3,
	},
} as const;

export const shadows = {
	// Тени для карточек
	card: {
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},

	// Тени для кнопок
	button: {
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.05,
		shadowRadius: 2,
		elevation: 1,
	},

	// Тени для модальных окон
	modal: {
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.1,
		shadowRadius: 8,
		elevation: 5,
	},

	// Тени для элементов форм
	input: {
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.05,
		shadowRadius: 2,
		elevation: 1,
	},
} as const;

