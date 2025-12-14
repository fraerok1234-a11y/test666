import { Question, TestResult } from '../constants/tests';

export const calculateQuizScore = (questions: Question[], answers: number[]): TestResult => {
	let score = 0;
	let total = 0;

	questions.forEach((question, index) => {
		if (question.correctAnswer !== undefined) {
			total++;
			if (answers[index] === question.correctAnswer) {
				score++;
			}
		}
	});

	const percentage = Math.round((score / total) * 100);

	return {
		score,
		total,
		percentage,
		feedback: getQuizFeedback(percentage)
	};
};

export const calculatePersonalityScore = (questions: Question[], answers: number[]): TestResult => {
	const score = answers.reduce((sum, answer) => sum + answer, 0);
	const total = questions.length * 3; // Максимальный балл (4 варианта, средний 3)
	const percentage = Math.round((score / total) * 100);

	return {
		score,
		total,
		percentage,
		feedback: getPersonalityFeedback(percentage)
	};
};

export const calculateAssessmentScore = (questions: Question[], answers: number[]): TestResult => {
	const score = answers.reduce((sum, answer) => sum + answer, 0);
	const total = questions.length * 4; // Максимальный балл (5 вариантов, средний 4)
	const percentage = Math.round((score / total) * 100);

	return {
		score,
		total,
		percentage,
		feedback: getAssessmentFeedback(percentage)
	};
};

const getQuizFeedback = (percentage: number): string => {
	if (percentage >= 90) return 'Чудово! Ви справжній експерт! 🌟🏆';
	if (percentage >= 80) return 'Відмінно! Ви показали чудові знання! 🌟';
	if (percentage >= 70) return 'Дуже добре! Ви добре підготовлені! 👍';
	if (percentage >= 60) return 'Добре! Є куди рости. 📈';
	if (percentage >= 50) return 'Задовільно. Потрібно підтягнути знання. 📚';
	if (percentage >= 40) return 'Спробуйте ще раз. Вчіться та розвивайтесь! 💪';
	return 'Не відчаюйтесь! Кожен експерт колись був новачком! 🌱';
};

const getPersonalityFeedback = (percentage: number): string => {
	if (percentage >= 80) return 'Вы очень активный и целеустремленный человек! 🚀';
	if (percentage >= 60) return 'У вас сбалансированный характер. ⚖️';
	if (percentage >= 40) return 'Вы более спокойный и рассудительный. 🧘';
	return 'Вы интроверт, цените спокойствие и порядок. 🌸';
};

const getAssessmentFeedback = (percentage: number): string => {
	if (percentage >= 80) return 'Вы опытный специалист! 🎯';
	if (percentage >= 60) return 'У вас хороший потенциал для роста. 📊';
	if (percentage >= 40) return 'Продолжайте развиваться в выбранном направлении. 🎓';
	return 'Начните с основ и постепенно развивайте навыки. 🌱';
};

export const getProgressPercentage = (currentQuestion: number, totalQuestions: number): number => {
	return Math.round(((currentQuestion + 1) / totalQuestions) * 100);
};

export const formatTime = (seconds: number): string => {
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = seconds % 60;
	return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export const shuffleArray = <T>(array: T[]): T[] => {
	const shuffled = [...array];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled;
};

export const getRandomQuestions = (questions: Question[], count: number): Question[] => {
	const shuffled = shuffleArray(questions);
	return shuffled.slice(0, Math.min(count, questions.length));
};

