Установка Docker


Убедитесь, что у вас установлен Docker на вашем компьютере.
Скачать и установить Docker можно с официального сайта https://www.docker.com

Откройте Docker на вашем компьютере и дождитесь его полной инициализации

## Установка и запуск

### Клонирование репозитория



```bash
git clone <url-репозитория>
cd docker_todo

docker-compose up

Adminer
Adminer предоставляет доступ к базе данных PostgreSQL.

URL: http://localhost:8080

Сервер: db
Движок: PostgreSQL
Имя пользователя: user
Пароль: password
База данных: todo_db

Запросы можно делать через Postman

Регистрация пользователя
Метод: POST
URL: http://localhost:3000/api/register


{
  "email": "example@example.com",
  "password": "yourpassword"
}


Авторизация пользователя
Метод: POST
URL: http://localhost:3000/api/login
Тело запроса:

{
  "email": "example@example.com",
  "password": "yourpassword"
}

Ответ: Вы получите токен доступа.


Управление задачами (Tasks)
Создание задачи
Метод: POST
URL: http://localhost:3000/api/tasks
Тело запроса:

{
  "title": "Название задачи",
  "description": "Описание задачи"
}
Заголовок: Authorization:  ваш_токен


Получение списка задач
Метод: GET
URL: http://localhost:3000/api/tasks
Заголовок: Authorization:  ваш_токен


Обновление задачи
Метод: PUT
URL: http://localhost:3000/api/tasks/
Тело запроса:

{
  "title": "Новое название задачи",
  "description": "Новое описание задачи",
  "status": true
}
Заголовок: Authorization:  ваш_токен
Удаление задачи
Метод: DELETE
URL: http://localhost:3000/api/tasks/
Заголовок: Authorization:  ваш_токен