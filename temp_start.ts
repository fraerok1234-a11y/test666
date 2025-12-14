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

