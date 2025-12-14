# Быстрый старт для Android

## Установка зависимостей

```bash
cd TestApp
npm install
```

## Тестирование на устройстве

1. Подключите Android устройство или запустите эмулятор
2. Запустите приложение:
```bash
npm run android
```

## Настройка покупок для тестирования

1. Создайте приложение в Google Play Console (см. PLAY_STORE_SETUP.md)
2. Создайте In-App Product с ID: `access_tests`
3. Добавьте тестовый аккаунт Google в Play Console → Настройки → Управление тестовыми аккаунтами
4. Войдите на устройстве под тестовым аккаунтом
5. Покупки будут работать в тестовом режиме (без списания денег)

## Сборка для публикации

```bash
# Войдите в Expo
npx expo login

# Соберите production версию
npx eas build --platform android --profile production
```

После сборки скачайте `.aab` файл и загрузите в Play Console.

## Важно

- ID продукта должен совпадать с `PRODUCT_ID` в `services/purchaseService.ts` (по умолчанию: `access_tests`)
- Для тестирования используйте тестовые аккаунты Google Play
- Реальные покупки работают только после публикации в Play Store




