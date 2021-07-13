# movies-explorer-api

## Описание

REST API для аутентификации пользователей и сохранения фильмов в избранном. Создан для сервиса поиска фильмов **Movie Explorer**, в котором можно найти фильмы по ключевым словам.

**адрес домена сервера:**

`api.cados-cinema.students.nomoredomains.club`
Публичный IP адресс - 80.89.229.122

## Функционал

### Роуты авторизации пользователей

* POST /signup - создает пользователя с переданными в теле запроса;
* POST /signin - авторизирует пользователя с переданными в теле запроса;

### Роуты для пользователей

* GET /users/me - возвращает данные авторизированного пользоователя;
* PATCH /users/me - редактирует свои данные;

### Роуты для карточек

* GET /movies - возвращает все сохранённые пользователем фильмы;
* POST /movies - создаёт фильм с переданными в теле запроса;
* DELETE /movies/:movieId - удаляет сохранённый фильм по _id;

## Технологии

* expressjs
* API REST
* MongoDB

## Инструкция по установке

Клонировать репозиторий:

* `git clone https://github.com/cados/movies-explorer-api.git`

В директории проекта запустить приложение в режиме разработки:

* `npm install` - установка зависимостей;
* `npm run dev` - запуск сервера в режиме разработки;
* `npm run start` - запуск сервера;

## Используемые технологии

* Expressjs
* nodemon
* MongoDB
* mongoose
* dotenv
* cors
* celebrate
* bcryptjs
* express-rate-limit
* winston
* express-winston
* helmet
* jsonwebtoken
* validator
* eslint

## Чеклист

[Критерии диплома веб-разработка](https://code.s3.yandex.net/web-developer/static/new-program/web-diploma-criteria-2.0/index.html)
