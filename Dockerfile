# Указываем базовый образ Node.js
FROM node:20

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json в контейнер
COPY package.json package-lock.json ./

# Устанавливаем зависимости
RUN npm install



# Копируем остальные файлы проекта в контейнер
COPY . .

# Устанавливаем переменную окружения для порта
ENV PORT=3000

# Открываем порт
EXPOSE 3000

# Команда для генерации Prisma Client, выполнения миграций и запуска приложения
CMD ["sh", "-c", "npx prisma generate && npx prisma migrate deploy && npm run dev"]