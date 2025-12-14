export interface Question {
	id: number;
	question: string;
	options: string[];
	correctAnswer?: number;
	category?: string;
}

export interface TestResult {
	score: number;
	total: number;
	percentage: number;
	feedback: string;
}

export interface TestConfig {
	title: string;
	subtitle: string;
	color: string;
	questions: Question[];
}

export type TestType = 'quiz' | 'personality' | 'assessment';

export interface AppState {
	currentTest: TestType | '';
	currentQuestion: number;
	answers: number[];
	showResults: boolean;
	testResults: TestResult | null;
	testStartTime: number | null;
	testEndTime: number | null;
}

export interface NavigationProps {
	navigation: {
		navigate: (screen: string, params?: any) => void;
		goBack: () => void;
	};
}

export interface TestCardProps {
	title: string;
	subtitle: string;
	icon: string;
	onPress: () => void;
	color?: string;
}

export interface ResultsCardProps {
	result: TestResult;
	testType: TestType;
	timeSpent?: number;
}

export interface QuestionCardProps {
	question: Question;
	currentQuestion: number;
	totalQuestions: number;
	onAnswer: (answerIndex: number) => void;
	onBack: () => void;
}

export interface ProgressBarProps {
	current: number;
	total: number;
	color?: string;
}

export interface TimerProps {
	startTime: number;
	isRunning: boolean;
}

export interface StatsData {
	totalTestsTaken: number;
	averageScore: number;
	bestScore: number;
	favoriteTest: TestType;
	totalTimeSpent: number;
}

