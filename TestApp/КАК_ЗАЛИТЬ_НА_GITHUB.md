# Как залить программу на GitHub

## Шаг 1: Подготовка файлов

Убедитесь, что файл `.gitignore` в папке `TestApp` содержит необходимые исключения (он уже настроен).

## Шаг 2: Добавление файлов в Git

Откройте Git Bash или терминал в корневой директории проекта (`e:\sait_printer`) и выполните:

```bash
# Перейдите в корневую директорию проекта
cd /e/sait_printer

# Добавьте папку TestApp в git
git add TestApp/

# Проверьте, что будет добавлено
git status

# Создайте коммит
git commit -m "Додано тестове додаток з вибором тем"
```

## Шаг 3: Создание репозитория на GitHub

1. Откройте [GitHub.com](https://github.com) и войдите в свой аккаунт
2. Нажмите кнопку **"+"** в правом верхнем углу → **"New repository"**
3. Заполните форму:
   - **Repository name**: `test-app` (или любое другое имя)
   - **Description**: "Тестове додаток для перевірки знань"
   - Выберите **Public** или **Private**
   - **НЕ** отмечайте "Initialize this repository with a README" (если уже есть файлы)
4. Нажмите **"Create repository"**

## Шаг 4: Подключение к GitHub

После создания репозитория GitHub покажет инструкции. Выполните в терминале:

```bash
# Если репозиторий еще не подключен, добавьте remote
git remote add origin https://github.com/ВАШ_USERNAME/test-app.git

# Или если remote уже существует, обновите URL
git remote set-url origin https://github.com/ВАШ_USERNAME/test-app.git

# Проверьте подключение
git remote -v
```

## Шаг 5: Загрузка кода на GitHub

```bash
# Отправьте код на GitHub
git push -u origin master

# Или если ваша ветка называется main:
git push -u origin main
```

Если GitHub попросит авторизацию:
- Используйте **Personal Access Token** вместо пароля
- Или настройте SSH ключи

## Шаг 6: Настройка GitHub Pages (опционально)

Если хотите разместить приложение на GitHub Pages:

1. Перейдите в настройки репозитория: **Settings** → **Pages**
2. В разделе **Source** выберите ветку `master` или `main`
3. Выберите папку `/TestApp` (если нужно)
4. Нажмите **Save**

## Альтернативный способ через GitHub Desktop

1. Скачайте [GitHub Desktop](https://desktop.github.com/)
2. Откройте GitHub Desktop
3. **File** → **Add Local Repository**
4. Выберите папку `e:\sait_printer`
5. Нажмите **Publish repository** в правом верхнем углу
6. Заполните название и описание
7. Нажмите **Publish Repository**

## Полезные команды

```bash
# Проверить статус
git status

# Посмотреть историю коммитов
git log

# Обновить код с GitHub
git pull origin master

# Создать новую ветку
git checkout -b feature/new-feature

# Переключиться на ветку
git checkout master
```

## Важно!

- **НЕ** загружайте файлы с паролями и API ключами
- **НЕ** загружайте `node_modules/` (уже в .gitignore)
- Проверьте `.gitignore` перед коммитом
- Файл `questions.docx` будет загружен (это нормально, если хотите)

## Если возникли проблемы

1. **Ошибка авторизации**: Используйте Personal Access Token
2. **Конфликты**: Выполните `git pull` перед `git push`
3. **Большой размер файла**: GitHub ограничивает файлы до 100MB


