import React, { useState, useEffect } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	ScrollView,
	SafeAreaView,
	StatusBar,
	ActivityIndicator,
	Platform,
} from 'react-native';
import Paywall from './components/Paywall';
import TestCard from './components/TestCard';
import ResultsCard from './components/ResultsCard';
import { purchaseService } from './services/purchaseService';
// Загружаем конфигурацию с обработкой ошибок
let TEST_CONFIG: any;
let TEST_TYPES: any;

try {
	const testsModule = require('./constants/tests');
	TEST_CONFIG = testsModule.TEST_CONFIG;
	TEST_TYPES = testsModule.TEST_TYPES;
	console.log('✅ Tests module loaded successfully');
} catch (error) {
	console.error('❌ Error loading tests module:', error);
	// Временная заглушка
	TEST_CONFIG = {
		quiz: {
			title: '📚 Вікторина',
			subtitle: 'Перевірте свої знання',
			color: '#3498db',
			questions: []
		}
	};
	TEST_TYPES = { QUIZ: 'quiz' };
}
import {
	calculateQuizScore,
} from './utils/testUtils';
// type Question = any;
// type TestResult = any;
type Question = {
	id: number;
	question: string;
	options: string[];
	correctAnswer?: number;
	category?: string;
};
type TestResult = {
	score: number;
	total: number;
	percentage: number;
	feedback: string;
};

const IS_WEB = Platform.OS === 'web';

const App: React.FC = () => {
	// Отладка загрузки
	console.log('🚀 App component starting...');
	console.log('IS_WEB:', IS_WEB);
	
	try {
		console.log('✅ TEST_CONFIG loaded:', TEST_CONFIG ? 'yes' : 'no');
		console.log('✅ TEST_TYPES loaded:', TEST_TYPES ? 'yes' : 'no');
		if (TEST_CONFIG && TEST_TYPES) {
			const quizConfig = TEST_CONFIG[TEST_TYPES.QUIZ];
			console.log('✅ Quiz config:', quizConfig ? 'yes' : 'no');
			console.log('✅ Questions count:', quizConfig?.questions?.length || 0);
		}
	} catch (error) {
		console.error('❌ Error accessing TEST_CONFIG:', error);
		console.error('Error details:', error);
	}
	
	const [isPurchased, setIsPurchased] = useState<boolean>(IS_WEB);
	const [isCheckingPurchase, setIsCheckingPurchase] = useState<boolean>(!IS_WEB);
	const [currentTest, setCurrentTest] = useState<string>('');
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
	const [currentQuestion, setCurrentQuestion] = useState<number>(0);
	const [answers, setAnswers] = useState<number[]>([]);
	const [showResults, setShowResults] = useState<boolean>(false);
	const [testResults, setTestResults] = useState<TestResult | null>(null);
	const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
	const [showCorrectAnswer, setShowCorrectAnswer] = useState<boolean>(false);

	useEffect(() => {
		if (!IS_WEB) {
			checkPurchaseStatus();
			return () => {
				purchaseService.cleanup();
			};
		} else {
			setIsCheckingPurchase(false);
		}
	}, []);

	const checkPurchaseStatus = async () => {
		try {
			const purchased = await purchaseService.checkPurchaseStatus();
			setIsPurchased(purchased);
		} catch (error) {
			console.error('Error checking purchase:', error);
			setIsPurchased(true);
		} finally {
			setIsCheckingPurchase(false);
		}
	};

	const handlePurchaseComplete = () => {
		setIsPurchased(true);
	};

	const getAvailableCategories = (): string[] => {
		const allQuestions = TEST_CONFIG[TEST_TYPES.QUIZ].questions;
		const categories = new Set<string>();
		allQuestions.forEach(q => {
			if (q.category) {
				categories.add(q.category);
			}
		});
		return Array.from(categories).sort();
	};

	const getCurrentQuestions = (): Question[] => {
		const allQuestions = TEST_CONFIG[TEST_TYPES.QUIZ].questions;
		if (selectedCategory) {
			return allQuestions.filter(q => q.category === selectedCategory);
		}
		return allQuestions;
	};

	const handleAnswer = (answerIndex: number) => {
		setSelectedAnswer(answerIndex);
		setShowCorrectAnswer(true);
		
		const newAnswers = [...answers];
		newAnswers[currentQuestion] = answerIndex;
		setAnswers(newAnswers);

		const questions = getCurrentQuestions();
		
		setTimeout(() => {
			if (currentQuestion < questions.length - 1) {
				setCurrentQuestion(currentQuestion + 1);
				setSelectedAnswer(null);
				setShowCorrectAnswer(false);
			} else {
				calculateResults(newAnswers);
			}
		}, 2000);
	};

	const calculateResults = (finalAnswers: number[]) => {
		const questions = getCurrentQuestions();
		const result = calculateQuizScore(questions, finalAnswers);
		setTestResults(result);
		setShowResults(true);
	};

	const startTest = (testType: string, category?: string) => {
		setCurrentTest(TEST_TYPES.QUIZ);
		setSelectedCategory(category || null);
		setCurrentQuestion(0);
		setAnswers([]);
		setShowResults(false);
		setTestResults(null);
		setSelectedAnswer(null);
		setShowCorrectAnswer(false);
	};

	const resetTest = () => {
		setCurrentTest('');
		setSelectedCategory(null);
		setCurrentQuestion(0);
		setAnswers([]);
		setShowResults(false);
		setTestResults(null);
		setSelectedAnswer(null);
		setShowCorrectAnswer(false);
	};

	const renderMainMenu = () => {
		const quizConfig = TEST_CONFIG[TEST_TYPES.QUIZ];
		const questionsCount = quizConfig.questions.length;

		return (
		<View style={styles.container}>
			<Text style={styles.title}>Тестове Додаток</Text>
			<Text style={styles.subtitle}>Перевірте свої знання</Text>
				<Text style={styles.subtitle}>Доступно питань: {questionsCount}</Text>

			<TestCard
					title={quizConfig.title}
					subtitle={quizConfig.subtitle}
				icon="📚"
					color={quizConfig.color}
				onPress={() => setCurrentTest('category-selection')}
			/>
		</View>
	);
	};

	const renderCategorySelection = () => {
		const categories = getAvailableCategories();
		const allQuestions = TEST_CONFIG[TEST_TYPES.QUIZ].questions;
  
		return (
			<View style={styles.container}>
				<Text style={styles.title}>Оберіть тему</Text>
				<Text style={styles.subtitle}>Виберіть категорію питань для тестування</Text>

				<View style={styles.categoriesContainer}>
					<TouchableOpacity
						style={styles.categoryCard}
						onPress={() => startTest(TEST_TYPES.QUIZ, undefined)}
					>
						<Text style={styles.categoryIcon}>📚</Text>
						<Text style={styles.categoryTitle}>Всі теми</Text>
						<Text style={styles.categoryCount}>{allQuestions.length} питань</Text>
					</TouchableOpacity>

					{categories.map((category, index) => {
						const count = allQuestions.filter(q => q.category === category).length;
						const colors = ['#3498db', '#27ae60', '#e74c3c', '#f39c12', '#9b59b6', '#1abc9c'];
						const color = colors[index % colors.length];
						
						return (
							<TouchableOpacity
								key={category}
								style={[styles.categoryCard, { borderColor: color, borderWidth: 2 }]}
								onPress={() => startTest(TEST_TYPES.QUIZ, category)}
							>
								<Text style={styles.categoryIcon}>📖</Text>
								<Text style={styles.categoryTitle}>{category}</Text>
								<Text style={styles.categoryCount}>{count} питань</Text>
							</TouchableOpacity>
						);
					})}
				</View>

				<TouchableOpacity style={styles.backButton} onPress={() => setCurrentTest('')}>
					<Text style={styles.backButtonText}>← Назад</Text>
				</TouchableOpacity>
			</View>
		);
	};

	const renderQuestion = () => {
		const questions = getCurrentQuestions();
		const question = questions[currentQuestion];

		if (!question) return null;

		return (
			<View style={styles.container}>
				<View style={styles.progressContainer}>
					<Text style={styles.progressText}>
						Питання {currentQuestion + 1} з {questions.length}
					</Text>
					<View style={styles.progressBar}>
						<View
							style={[
								styles.progressFill,
								{ width: `${((currentQuestion + 1) / questions.length) * 100}%` },
							]}
						/>
					</View>
				</View>

				<Text style={styles.questionText}>{question.question}</Text>

				{question.category && (
					<Text style={styles.categoryText}>Категорія: {question.category}</Text>
				)}

				<View style={styles.optionsContainer}>
					{question.options.map((option, index) => {
						const isSelected = selectedAnswer === index;
						const isCorrect = question.correctAnswer === index;
						const isWrong = isSelected && !isCorrect;
						const showAnswer = showCorrectAnswer;
						
						const buttonStyles = [styles.optionButton];
						const textStyles = [styles.optionText];
						
						if (showAnswer) {
							if (isCorrect) {
								buttonStyles.push(styles.correctAnswerButton);
								textStyles.push(styles.correctAnswerText);
							} else if (isWrong) {
								buttonStyles.push(styles.wrongAnswerButton);
								textStyles.push(styles.wrongAnswerText);
							}
						}
						
						return (
							<TouchableOpacity
								key={index}
								style={buttonStyles}
								onPress={() => !showAnswer && handleAnswer(index)}
								disabled={showAnswer}
							>
								<Text style={textStyles}>
									{showAnswer && isCorrect ? '✓ ' : ''}
									{showAnswer && isWrong ? '✗ ' : ''}
									{option}
								</Text>
							</TouchableOpacity>
						);
					})}
				</View>

				<TouchableOpacity style={styles.backButton} onPress={resetTest}>
					<Text style={styles.backButtonText}>← Назад</Text>
				</TouchableOpacity>
			</View>
		);
	};

	const renderResults = () => {
		if (!testResults) return null;
		const questions = getCurrentQuestions();

		return (
			<View style={styles.container}>
				<ResultsCard 
					result={testResults} 
					testType={currentTest}
					questions={questions}
					answers={answers}
				/>

				<TouchableOpacity style={styles.restartButton} onPress={() => startTest(currentTest, selectedCategory || undefined)}>
					<Text style={styles.buttonText}>Пройти тест знову</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.menuButton} onPress={resetTest}>
					<Text style={styles.menuButtonText}>Головне меню</Text>
				</TouchableOpacity>
			</View>
		);
	};

	if (isCheckingPurchase) {
		return (
			<SafeAreaView style={styles.safeArea}>
				<View style={styles.loadingContainer}>
					<ActivityIndicator size="large" color="#3498db" />
					<Text style={styles.loadingText}>Завантаження...</Text>
				</View>
			</SafeAreaView>
		);
	}

	if (!isPurchased) {
		return (
			<SafeAreaView style={styles.safeArea}>
				<StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
				<ScrollView contentContainerStyle={styles.scrollContainer}>
					<Paywall onPurchaseComplete={handlePurchaseComplete} />
				</ScrollView>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView style={styles.safeArea}>
			<StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
			<ScrollView contentContainerStyle={styles.scrollContainer}>
				{!currentTest && renderMainMenu()}
				{currentTest === 'category-selection' && renderCategorySelection()}
				{currentTest === TEST_TYPES.QUIZ && !showResults && renderQuestion()}
				{showResults && renderResults()}
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: '#f8f9fa',
	},
	scrollContainer: {
		flexGrow: 1,
	},
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: '#f8f9fa',
	},
	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	loadingText: {
		marginTop: 15,
		fontSize: 16,
		color: '#7f8c8d',
	},
	title: {
		fontSize: 28,
		fontWeight: 'bold',
		textAlign: 'center',
		marginBottom: 10,
		color: '#2c3e50',
	},
	subtitle: {
		fontSize: 16,
		textAlign: 'center',
		marginBottom: 30,
		color: '#7f8c8d',
	},
	progressContainer: {
		marginBottom: 20,
	},
	progressText: {
		fontSize: 16,
		textAlign: 'center',
		marginBottom: 10,
		color: '#2c3e50',
	},
	progressBar: {
		height: 8,
		backgroundColor: '#ecf0f1',
		borderRadius: 4,
		overflow: 'hidden',
	},
	progressFill: {
		height: '100%',
		backgroundColor: '#27ae60',
	},
	questionText: {
		fontSize: 20,
		fontWeight: '600',
		textAlign: 'center',
		marginBottom: 15,
		color: '#2c3e50',
		lineHeight: 28,
	},
	categoryText: {
		fontSize: 14,
		textAlign: 'center',
		marginBottom: 25,
		color: '#7f8c8d',
		fontStyle: 'italic',
	},
	optionsContainer: {
		flex: 1,
	},
	optionButton: {
		backgroundColor: 'white',
		padding: 15,
		borderRadius: 10,
		marginBottom: 12,
		borderWidth: 2,
		borderColor: '#ecf0f1',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.05,
		shadowRadius: 2,
		elevation: 1,
	},
	optionText: {
		fontSize: 16,
		color: '#2c3e50',
		textAlign: 'center',
	},
	correctAnswerButton: {
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
	correctAnswerText: {
		color: '#27ae60',
		fontWeight: 'bold',
		fontSize: 17,
	},
	wrongAnswerButton: {
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
	wrongAnswerText: {
		color: '#e74c3c',
		fontWeight: 'bold',
		fontSize: 17,
	},
	backButton: {
		padding: 15,
		marginTop: 20,
	},
	backButtonText: {
		fontSize: 16,
		color: '#7f8c8d',
		textAlign: 'center',
	},
	restartButton: {
		backgroundColor: '#27ae60',
		padding: 18,
		borderRadius: 12,
		marginBottom: 15,
	},
	menuButton: {
		backgroundColor: '#95a5a6',
		padding: 18,
		borderRadius: 12,
	},
	buttonText: {
		color: 'white',
		fontSize: 16,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	menuButtonText: {
		color: 'white',
		fontSize: 16,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	categoriesContainer: {
		flex: 1,
		width: '100%',
	},
	categoryCard: {
		backgroundColor: 'white',
		padding: 20,
		borderRadius: 12,
		marginBottom: 15,
		alignItems: 'center',
		borderWidth: 2,
		borderColor: '#ecf0f1',
		...(Platform.OS === 'web' ? {
			boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
		} : {
			shadowColor: '#000',
			shadowOffset: { width: 0, height: 2 },
			shadowOpacity: 0.1,
			shadowRadius: 4,
			elevation: 3,
		}),
	},
	categoryIcon: {
		fontSize: 48,
		marginBottom: 10,
	},
	categoryTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#2c3e50',
		textAlign: 'center',
		marginBottom: 8,
	},
	categoryCount: {
		fontSize: 14,
		color: '#7f8c8d',
		textAlign: 'center',
	},
});

export default App;

