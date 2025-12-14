import { Platform } from 'react-native';

const IS_WEB = Platform.OS === 'web';

// Динамический импорт для избежания ошибок в веб-версии
let RNIap: any = null;
let AsyncStorage: any = null;

if (!IS_WEB) {
	try {
		RNIap = require('react-native-iap');
		AsyncStorage = require('@react-native-async-storage/async-storage').default;
	} catch (e) {
		console.warn('Native modules not available');
	}
} else {
	// Для веб используем localStorage как заглушку
	AsyncStorage = {
		getItem: async (key: string) => {
			if (typeof window !== 'undefined') {
				return window.localStorage.getItem(key);
			}
			return null;
		},
		setItem: async (key: string, value: string) => {
			if (typeof window !== 'undefined') {
				window.localStorage.setItem(key, value);
			}
		},
		removeItem: async (key: string) => {
			if (typeof window !== 'undefined') {
				window.localStorage.removeItem(key);
			}
		},
	};
}

const PRODUCT_ID = 'access_tests'; // ID товара в Play Console
const PURCHASE_KEY = '@testapp:purchased';

export interface PurchaseState {
	isPurchased: boolean;
	isLoading: boolean;
	error: string | null;
}

class PurchaseService {
	private purchaseUpdateSubscription: any = null;
	private purchaseErrorSubscription: any = null;

	async initialize(): Promise<void> {
		if (IS_WEB || !RNIap) {
			console.log('IAP not available on web platform');
			return;
		}
		try {
			await RNIap.initConnection();
			console.log('IAP initialized');
		} catch (error) {
			console.error('IAP initialization error:', error);
			throw error;
		}
	}

	async checkPurchaseStatus(): Promise<boolean> {
		// Для веб-версии разрешаем доступ (для тестирования)
		if (IS_WEB) {
			return true;
		}
		
		if (!AsyncStorage) return false;
		
		try {
			const stored = await AsyncStorage.getItem(PURCHASE_KEY);
			if (stored === 'true') {
				// Проверяем актуальность покупки через Play Store
				if (!RNIap) return false;
				const purchases = await RNIap.getAvailablePurchases();
				const hasValidPurchase = purchases.some(
					(purchase: any) => purchase.productId === PRODUCT_ID
				);
				
				if (hasValidPurchase) {
					return true;
				} else {
					// Покупка не найдена, сбрасываем статус
					await AsyncStorage.setItem(PURCHASE_KEY, 'false');
					return false;
				}
			}
			return false;
		} catch (error) {
			console.error('Error checking purchase status:', error);
			return false;
		}
	}

	async getProductInfo(): Promise<any | null> {
		if (IS_WEB || !RNIap) {
			// Возвращаем заглушку для веб-версии
			return {
				productId: PRODUCT_ID,
				title: 'Полный доступ к тестам',
				description: 'Разблокирует все тесты и функции приложения',
				localizedPrice: '99₴',
				currency: 'UAH',
				price: '99',
			};
		}
		
		try {
			const products = await RNIap.getProducts({ skus: [PRODUCT_ID] });
			return products.length > 0 ? products[0] : null;
		} catch (error) {
			console.error('Error getting product info:', error);
			return null;
		}
	}

	async purchase(): Promise<boolean> {
		if (IS_WEB) {
			// Для веб-версии просто разрешаем доступ
			if (AsyncStorage) {
				await AsyncStorage.setItem(PURCHASE_KEY, 'true');
			}
			return true;
		}
		
		if (!RNIap) return false;
		
		try {
			const purchase = await RNIap.requestPurchase({
				sku: PRODUCT_ID,
				andDangerouslyFinishTransactionAutomaticallyIOS: false,
			});

			if (purchase) {
				await this.finishPurchase(purchase);
				return true;
			}
			return false;
		} catch (error: any) {
			console.error('Purchase error:', error);
			if (error.code === 'E_USER_CANCELLED') {
				throw new Error('Покупка отменена');
			}
			throw new Error('Ошибка при покупке. Попробуйте позже.');
		}
	}

	async finishPurchase(purchase: any): Promise<void> {
		try {
			// Завершаем транзакцию
			if (!IS_WEB && RNIap) {
				await RNIap.finishTransaction({ purchase });
			}
			
			// Сохраняем статус покупки
			if (AsyncStorage) {
				await AsyncStorage.setItem(PURCHASE_KEY, 'true');
			}
			
			console.log('Purchase completed:', purchase.productId);
		} catch (error) {
			console.error('Error finishing purchase:', error);
			throw error;
		}
	}

	setupPurchaseListeners(
		onPurchaseUpdate: (purchase: any) => void,
		onPurchaseError: (error: any) => void
	): void {
		if (IS_WEB || !RNIap) {
			return;
		}
		
		this.purchaseUpdateSubscription = RNIap.purchaseUpdatedListener(
			async (purchaseResponse: any) => {
				if (purchaseResponse.productId === PRODUCT_ID) {
					await this.finishPurchase(purchaseResponse);
					onPurchaseUpdate(purchaseResponse);
				}
			}
		);

		this.purchaseErrorSubscription = RNIap.purchaseErrorListener(
			(error: any) => {
				console.error('Purchase error listener:', error);
				onPurchaseError(error);
			}
		);
	}

	cleanup(): void {
		if (IS_WEB || !RNIap) {
			return;
		}
		
		if (this.purchaseUpdateSubscription) {
			this.purchaseUpdateSubscription.remove();
			this.purchaseUpdateSubscription = null;
		}
		if (this.purchaseErrorSubscription) {
			this.purchaseErrorSubscription.remove();
			this.purchaseErrorSubscription = null;
		}
		RNIap.endConnection();
	}

	// Для тестирования (только в dev режиме)
	async resetPurchase(): Promise<void> {
		if (AsyncStorage) {
			await AsyncStorage.setItem(PURCHASE_KEY, 'false');
		}
	}
}

export const purchaseService = new PurchaseService();

