# 📝 Blog Pet

![GitHub last commit](https://img.shields.io/github/last-commit/Madakalov-front/blog-pet)
![GitHub repo size](https://img.shields.io/github/repo-size/Madakalov-front/blog-pet)
![GitHub issues](https://img.shields.io/github/issues/Madakalov-front/blog-pet)
![GitHub stars](https://img.shields.io/github/stars/Madakalov-front/blog-pet?style=social)

🚀 Учебный pet-проект блога с возможностью регистрации, авторизации и управления постами.  
Фронтенд написан на **React + Vite + TypeScript**, бэкенд — **Express + PostgreSQL**.  
Проект задеплоен на **Vercel**.

🔗 **Демо:** [blog-pet-seven.vercel.app](https://blog-pet-seven.vercel.app/)  
📦 **Репозиторий:** [GitHub](https://github.com/Madakalov-front/blog-pet)

## ⚠️ Замечания

- Для корректной работы приложения может потребоваться использование **VPN или прокси**,  
  так как некоторые внешние сервисы (например, база данных или API) могут быть недоступны из вашего региона.
- Локальный запуск проекта не предусмотрен, используйте [развернутую версию на Vercel](https://blog-pet-seven.vercel.app/).


## 🔑 Тестовые аккаунты

Для проверки функционала доступен аккаунт администратора:

-   **Login:** `egor`
-   **Password:** `qazwsx1234`

---

## ⚡️ Функционал

-   🔐 Авторизация / регистрация пользователей (JWT)
-   📝 Создание, редактирование и удаление постов
-   🔎 Поиск и фильтрация статей
-   🎨 Адаптивный интерфейс
-   💾 Подключение к базе данных PostgreSQL

---

## 🛠️ Технологии

### Frontend

-   [React 19](https://react.dev/)
-   [Vite](https://vitejs.dev/)
-   [React Router v7](https://reactrouter.com/)
-   [Redux Toolkit](https://redux-toolkit.js.org/)
-   [React Hook Form](https://react-hook-form.com/)
-   [Zod](https://zod.dev/) — валидация форм
-   [Sass](https://sass-lang.com/) — стилизация
-   [FontAwesome](https://fontawesome.com/) — иконки

### Backend

-   [Express](https://expressjs.com/)
-   [PostgreSQL](https://www.postgresql.org/) + [pg](https://www.npmjs.com/package/pg)
-   [JWT](https://jwt.io/) — аутентификация
-   [bcrypt](https://www.npmjs.com/package/bcrypt) — хеширование паролей
-   [dotenv](https://www.npmjs.com/package/dotenv) — переменные окружения
-   [CORS](https://www.npmjs.com/package/cors)

---

## 📂 Структура проекта

```bash
blog-pet/
├── backend/        # Серверная часть (Express + PostgreSQL)
│   ├── src/
│   └── dist/
├── react/       # Клиентская часть (React + Vite)
│   ├── src/
│   └── public/
└── README.md
```

---

## 🌍 Деплой

Локальный запуск **не предусмотрен**, проект развернут на Vercel.
👉 [Перейти к демо](https://blog-pet-seven.vercel.app/)




