const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Исключаем react-native-iap для веб-платформы
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

// Настройка для веб
config.resolver.resolveRequest = (context, moduleName, platform) => {
  // Для веб-платформы заменяем react-native-iap на заглушку
  if (platform === 'web' && moduleName === 'react-native-iap') {
    return {
      type: 'empty',
    };
  }
  
  // Используем стандартное разрешение
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;




