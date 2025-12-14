import React from 'react';
import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native';
import type { Question } from '../constants/tests';

interface TestResult {
	score: number;
	total: number;
	percentage: number;
	feedback: string;
}

interface ResultsCardProps {
	result: TestResult;
	testType: string;
	questions?: Question[];
	answers?: number[];
}

const ResultsCard: React.FC<ResultsCardProps> = ({ result, testType, questions = [], answers = [] }) => {
	// Отладка
	React.useEffect(() => {
		console.log('ResultsCard rendered:', {
			questionsCount: questions.length,
			answersCount: answers.length,
			testType,
			firstQuestionCorrectAnswer: questions[0]?.correctAnswer,
			firstAnswer: answers[0]
		});
	}, [questions, answers, testType]);
	
	const getScoreColor = (percentage: number) => {
		if (percentage >= 80) return '#27ae60';
		if (percentage >= 60) return '#f39c12';
		if (percentage >= 40) return '#e67e22';
		return '#e74c3c';
	};

	const getTestTypeIcon = (type: string) => {
		switch (type) {
			case 'quiz': return '📚';
			case 'personality': return '🧠';
			case 'assessment': return '💼';
			default: return '📊';
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.icon}>{getTestTypeIcon(testType)}</Text>
				<Text style={styles.title}>Результати тесту</Text>
			</View>

			<View style={styles.scoreContainer}>
				<Text style={styles.scoreText}>
					{result.score} з {result.total}
				</Text>
				<Text style={[styles.percentageText, { color: getScoreColor(result.percentage) }]}>
					{result.percentage}%
				</Text>
			</View>

			<View style={styles.feedbackContainer}>
				<Text style={styles.feedbackLabel}>Зворотний зв'язок:</Text>
				<Text style={styles.feedbackText}>{result.feedback}</Text>
			</View>

			<View style={styles.statsContainer}>
				<View style={styles.statItem}>
					<Text style={styles.statLabel}>Правильних</Text>
					<Text style={styles.statValue}>{result.score}</Text>
				</View>
				<View style={styles.statItem}>
					<Text style={styles.statLabel}>Всього</Text>
					<Text style={styles.statValue}>{result.total}</Text>
				</View>
				<View style={styles.statItem}>
					<Text style={styles.statLabel}>Відсоток</Text>
					<Text style={styles.statValue}>{result.percentage}%</Text>
				</View>
			</View>

			{/* Секція з правильними відповідями */}
			<View style={styles.answersSection}>
				<Text style={styles.answersTitle}>📋 Правильні відповіді:</Text>
				{questions && Array.isArray(questions) && questions.length > 0 && answers && Array.isArray(answers) && answers.length > 0 ? (
					<ScrollView style={styles.answersList} nestedScrollEnabled>
						{questions.slice(0, Math.min(questions.length, answers.length)).map((question, index) => {
							const userAnswer = answers[index];
							const correctAnswer = question.correctAnswer;
							const isCorrect = userAnswer !== undefined && correctAnswer !== undefined && userAnswer === correctAnswer;
							
							return (
								<View key={`q-${question.id}-${index}`} style={styles.answerItem}>
									<View style={styles.answerHeader}>
										<Text style={styles.answerNumber}>Питання {index + 1}</Text>
										{isCorrect ? (
											<Text style={styles.correctBadge}>✓ Правильно</Text>
										) : (
											<Text style={styles.incorrectBadge}>✗ Неправильно</Text>
										)}
									</View>
									<Text style={styles.answerQuestion}>{question.question}</Text>
									<View style={styles.answerOptions}>
										{question.options.map((option, optIndex) => {
											const isUserAnswer = userAnswer === optIndex;
											const isCorrectOption = correctAnswer === optIndex;
											
											// Применяем стили через массив для правильного порядка
											const optionStyleArray = [styles.answerOption];
											const textStyleArray = [styles.answerOptionText];
											
											if (isCorrectOption) {
												optionStyleArray.push(styles.correctOption);
												textStyleArray.push(styles.correctOptionText);
											}
											
											if (isUserAnswer && !isCorrectOption) {
												optionStyleArray.push(styles.incorrectOption);
												textStyleArray.push(styles.incorrectOptionText);
											}
											
											let optionText = '';
											if (isCorrectOption) {
												optionText = '✓ ' + option;
											} else if (isUserAnswer && !isCorrectOption) {
												optionText = '✗ ' + option;
											} else {
												optionText = option;
											}
											
											return (
												<View
													key={`opt-${index}-${optIndex}`}
													style={optionStyleArray}
												>
													<Text style={textStyleArray}>
														{optionText}
													</Text>
												</View>
											);
										})}
									</View>
								</View>
							);
						})}
					</ScrollView>
				) : (
					<View style={{ padding: 20 }}>
						<Text style={{ color: '#7f8c8d', textAlign: 'center' }}>
							Дані не завантажені. Питань: {questions?.length || 0}, Відповідей: {answers?.length || 0}
						</Text>
					</View>
				)}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		padding: 25,
		borderRadius: 15,
		marginBottom: 30,
		...(Platform.OS === 'web' ? {
			boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
		} : {
			shadowColor: '#000',
			shadowOffset: { width: 0, height: 4 },
			shadowOpacity: 0.1,
			shadowRadius: 8,
			elevation: 5,
		}),
	},
	header: {
		alignItems: 'center',
		marginBottom: 20,
	},
	icon: {
		fontSize: 48,
		marginBottom: 10,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#2c3e50',
	},
	scoreContainer: {
		alignItems: 'center',
		marginBottom: 25,
	},
	scoreText: {
		fontSize: 20,
		color: '#7f8c8d',
		marginBottom: 10,
	},
	percentageText: {
		fontSize: 42,
		fontWeight: 'bold',
	},
	feedbackContainer: {
		marginBottom: 25,
	},
	feedbackLabel: {
		fontSize: 16,
		fontWeight: '600',
		color: '#2c3e50',
		marginBottom: 10,
	},
	feedbackText: {
		fontSize: 16,
		color: '#7f8c8d',
		lineHeight: 24,
		textAlign: 'center',
	},
	statsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		borderTopWidth: 1,
		borderTopColor: '#ecf0f1',
		paddingTop: 20,
	},
	statItem: {
		alignItems: 'center',
	},
	statLabel: {
		fontSize: 12,
		color: '#7f8c8d',
		marginBottom: 5,
	},
	statValue: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#2c3e50',
	},
	answersSection: {
		marginTop: 25,
		borderTopWidth: 2,
		borderTopColor: '#ecf0f1',
		paddingTop: 20,
	},
	answersTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#2c3e50',
		marginBottom: 15,
		textAlign: 'center',
	},
	answersList: {
		maxHeight: 500,
	},
	answerItem: {
		marginBottom: 20,
		padding: 15,
		backgroundColor: '#f8f9fa',
		borderRadius: 10,
		borderWidth: 1,
		borderColor: '#ecf0f1',
	},
	answerHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 10,
	},
	answerNumber: {
		fontSize: 14,
		fontWeight: '600',
		color: '#7f8c8d',
	},
	correctBadge: {
		fontSize: 12,
		fontWeight: 'bold',
		color: '#27ae60',
		backgroundColor: '#d5f4e6',
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 12,
	},
	incorrectBadge: {
		fontSize: 12,
		fontWeight: 'bold',
		color: '#e74c3c',
		backgroundColor: '#fadbd8',
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 12,
	},
	answerQuestion: {
		fontSize: 15,
		fontWeight: '600',
		color: '#2c3e50',
		marginBottom: 12,
		lineHeight: 22,
	},
	answerOptions: {
		marginTop: 8,
	},
	answerOption: {
		padding: 10,
		marginBottom: 8,
		borderRadius: 8,
		backgroundColor: 'white',
		borderWidth: 1,
		borderColor: '#ecf0f1',
	},
	correctOption: {
		backgroundColor: '#d5f4e6',
		borderColor: '#27ae60',
		borderWidth: 3,
		...(Platform.OS === 'web' ? {
			boxShadow: '0 2px 8px rgba(39, 174, 96, 0.5)',
		} : {
			shadowColor: '#27ae60',
			shadowOffset: { width: 0, height: 2 },
			shadowOpacity: 0.3,
			shadowRadius: 4,
			elevation: 5,
		}),
	},
	incorrectOption: {
		backgroundColor: '#fadbd8',
		borderColor: '#e74c3c',
		borderWidth: 3,
		...(Platform.OS === 'web' ? {
			boxShadow: '0 2px 8px rgba(231, 76, 60, 0.5)',
		} : {
			shadowColor: '#e74c3c',
			shadowOffset: { width: 0, height: 2 },
			shadowOpacity: 0.3,
			shadowRadius: 4,
			elevation: 5,
		}),
	},
	answerOptionText: {
		fontSize: 14,
		color: '#2c3e50',
		lineHeight: 20,
	},
	correctOptionText: {
		color: '#27ae60',
		fontWeight: 'bold',
		fontSize: 15,
	},
	incorrectOptionText: {
		color: '#e74c3c',
		fontWeight: 'bold',
		fontSize: 15,
	},
});

export default ResultsCard;

