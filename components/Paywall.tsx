import React, { useState, useEffect, useCallback } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	ActivityIndicator,
	Alert,
} from 'react-native';
import { purchaseService } from '../services/purchaseService';
import * as RNIap from 'react-native-iap';

interface PaywallProps {
	onPurchaseComplete: () => void;
}

const Paywall: React.FC<PaywallProps> = ({ onPurchaseComplete }) => {
	const [product, setProduct] = useState<RNIap.Product | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isPurchasing, setIsPurchasing] = useState(false);

	const setupListeners = useCallback(() => {
		purchaseService.setupPurchaseListeners(
			() => {
				setIsPurchasing(false);
				Alert.alert('Успіх!', 'Покупку завершено успішно!', [
					{ text: 'OK', onPress: onPurchaseComplete },
				]);
			},
			(error: { code?: string }) => {
				setIsPurchasing(false);
				if (error.code !== 'E_USER_CANCELLED') {
					Alert.alert('Помилка', 'Не вдалося завершити покупку');
				}
			}
		);
	}, [onPurchaseComplete]);

	useEffect(() => {
		loadProduct();
		setupListeners();

		return () => {
			purchaseService.cleanup();
		};
	}, [setupListeners]);

	const loadProduct = async () => {
		try {
			await purchaseService.initialize();
			const productInfo = await purchaseService.getProductInfo();
			setProduct(productInfo);
		} catch (error) {
			console.error('Error loading product:', error);
			Alert.alert('Помилка', 'Не вдалося завантажити інформацію про товар');
		} finally {
			setIsLoading(false);
		}
	};

	const handlePurchase = async () => {
		if (isPurchasing) return;

		setIsPurchasing(true);
		try {
			await purchaseService.purchase();
		} catch (err: unknown) {
			setIsPurchasing(false);
			const errorMessage = err instanceof Error ? err.message : 'Не вдалося виконати покупку';
			Alert.alert('Помилка', errorMessage);
		}
	};

	const formatPrice = (price: string, currency: string) => {
		// Простое форматирование цены
		return `${price} ${currency}`;
	};

	return (
		<View style={styles.container}>
			<View style={styles.content}>
				<Text style={styles.icon}>🔒</Text>
				<Text style={styles.title}>Повний доступ до тестів</Text>
				<Text style={styles.subtitle}>
					Придбайте повний доступ до всіх тестів та функцій додатку
				</Text>

				<View style={styles.featuresContainer}>
					<View style={styles.feature}>
						<Text style={styles.featureIcon}>✅</Text>
						<Text style={styles.featureText}>Всі типи тестів</Text>
					</View>
					<View style={styles.feature}>
						<Text style={styles.featureIcon}>✅</Text>
						<Text style={styles.featureText}>Необмежена кількість проходжень</Text>
					</View>
					<View style={styles.feature}>
						<Text style={styles.featureIcon}>✅</Text>
						<Text style={styles.featureText}>Детальні результати</Text>
					</View>
					<View style={styles.feature}>
						<Text style={styles.featureIcon}>✅</Text>
						<Text style={styles.featureText}>Без реклами</Text>
					</View>
				</View>

				{isLoading ? (
					<View style={styles.loadingContainer}>
						<ActivityIndicator size="large" color="#3498db" />
						<Text style={styles.loadingText}>Завантаження...</Text>
					</View>
				) : (
					<View style={styles.priceContainer}>
						{product ? (
							<>
								<Text style={styles.price}>
									{formatPrice(product.localizedPrice, product.currency)}
								</Text>
								<Text style={styles.priceDescription}>
									Одноразова покупка • Без підписки
								</Text>
							</>
						) : (
							<Text style={styles.priceDescription}>
								Ціна буде визначена при покупці
							</Text>
						)}
					</View>
				)}

				<TouchableOpacity
					style={[styles.purchaseButton, isPurchasing && styles.purchaseButtonDisabled]}
					onPress={handlePurchase}
					disabled={isPurchasing || isLoading}
				>
					{isPurchasing ? (
						<ActivityIndicator color="white" />
					) : (
						<Text style={styles.purchaseButtonText}>
							Купити повний доступ
						</Text>
					)}
				</TouchableOpacity>

				<Text style={styles.disclaimer}>
					Покупку буде списано з вашого акаунту Google Play.
					Ви можете скасувати покупку протягом 48 годин.
				</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f8f9fa',
		justifyContent: 'center',
		padding: 20,
	},
	content: {
		backgroundColor: 'white',
		borderRadius: 20,
		padding: 30,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.1,
		shadowRadius: 12,
		elevation: 8,
	},
	icon: {
		fontSize: 64,
		textAlign: 'center',
		marginBottom: 20,
	},
	title: {
		fontSize: 28,
		fontWeight: 'bold',
		textAlign: 'center',
		color: '#2c3e50',
		marginBottom: 10,
	},
	subtitle: {
		fontSize: 16,
		textAlign: 'center',
		color: '#7f8c8d',
		marginBottom: 30,
		lineHeight: 24,
	},
	featuresContainer: {
		marginBottom: 30,
	},
	feature: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 15,
	},
	featureIcon: {
		fontSize: 20,
		marginRight: 12,
	},
	featureText: {
		fontSize: 16,
		color: '#2c3e50',
		flex: 1,
	},
	priceContainer: {
		alignItems: 'center',
		marginBottom: 25,
		paddingVertical: 20,
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderColor: '#ecf0f1',
	},
	price: {
		fontSize: 36,
		fontWeight: 'bold',
		color: '#27ae60',
		marginBottom: 5,
	},
	priceDescription: {
		fontSize: 14,
		color: '#7f8c8d',
		textAlign: 'center',
	},
	loadingContainer: {
		alignItems: 'center',
		marginBottom: 25,
		paddingVertical: 20,
	},
	loadingText: {
		marginTop: 10,
		color: '#7f8c8d',
	},
	purchaseButton: {
		backgroundColor: '#27ae60',
		padding: 18,
		borderRadius: 12,
		alignItems: 'center',
		marginBottom: 15,
	},
	purchaseButtonDisabled: {
		opacity: 0.6,
	},
	purchaseButtonText: {
		color: 'white',
		fontSize: 18,
		fontWeight: 'bold',
	},
	disclaimer: {
		fontSize: 12,
		color: '#95a5a6',
		textAlign: 'center',
		lineHeight: 18,
	},
});

export default Paywall;

