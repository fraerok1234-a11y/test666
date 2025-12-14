export const colors = {
	// Основные цвета
	primary: '#3498db',
	secondary: '#2ecc71',
	accent: '#e74c3c',

	// Цвета для тестов
	quiz: '#3498db',
	personality: '#e74c3c',
	assessment: '#27ae60',

	// Нейтральные цвета
	white: '#ffffff',
	black: '#000000',
	gray: {
		50: '#f8f9fa',
		100: '#ecf0f1',
		200: '#bdc3c7',
		300: '#95a5a6',
		400: '#7f8c8d',
		500: '#6c757d',
		600: '#5a6268',
		700: '#495057',
		800: '#343a40',
		900: '#2c3e50',
	},

	// Цвета для результатов
	success: {
		light: '#d4edda',
		main: '#27ae60',
		dark: '#1e8449',
	},
	warning: {
		light: '#fff3cd',
		main: '#f39c12',
		dark: '#e67e22',
	},
	error: {
		light: '#f8d7da',
		main: '#e74c3c',
		dark: '#c0392b',
	},
	info: {
		light: '#d1ecf1',
		main: '#3498db',
		dark: '#2980b9',
	},

	// Цвета для прогресса
	progress: {
		background: '#ecf0f1',
		fill: '#27ae60',
		warning: '#f39c12',
		error: '#e74c3c',
	},

	// Цвета для текста
	text: {
		primary: '#2c3e50',
		secondary: '#7f8c8d',
		disabled: '#bdc3c7',
		inverse: '#ffffff',
	},

	// Цвета для фона
	background: {
		primary: '#f8f9fa',
		secondary: '#ffffff',
		card: '#ffffff',
		modal: 'rgba(0, 0, 0, 0.5)',
	},

	// Цвета для теней
	shadow: {
		light: 'rgba(0, 0, 0, 0.05)',
		medium: 'rgba(0, 0, 0, 0.1)',
		dark: 'rgba(0, 0, 0, 0.2)',
	},
} as const;

export const getScoreColor = (percentage: number): string => {
	if (percentage >= 90) return colors.success.main;
	if (percentage >= 80) return colors.success.main;
	if (percentage >= 70) return colors.info.main;
	if (percentage >= 60) return colors.warning.main;
	if (percentage >= 50) return colors.warning.dark;
	return colors.error.main;
};

export const getTestColor = (testType: string): string => {
	switch (testType) {
		case 'quiz':
			return colors.quiz;
		case 'personality':
			return colors.personality;
		case 'assessment':
			return colors.assessment;
		default:
			return colors.primary;
	}
};

