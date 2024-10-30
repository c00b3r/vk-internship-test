# Установка и запуск проекта

1. Склонируйте репозиторий:
   ```bash
   git clone https://github.com/c00b3r/vk-internship-test
2. Установите зависимости:
   ```bash
   npm install
3. Переименуйте файл **.env.local.example** в **.env**.
4. Получите токен GitHub. Инструкция по созданию токена доступна по ссылке: [Создание гитхаб токена](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-personal-access-token-classic).
5. Вставьте токен в файл **.env** в поле:
   ```bash
   VITE_TOKEN=сюда_ваш_токен
6. Запустите проект:
   ```bash
   npm run dev
7. Для запуска тестов и просмотра их покрытия
   ```bash
   npm run test:coverage
## Стек технологий
  - React
  - Typescript
  - MobX
  - Сборщик Vite 
  - Vitest с библиотекой react-testing-library и jest-dom
  - Material UI - Я выбрал эту библиотеку благодаря своему опыту работы с ней, а также за ее удобство и возможность быстрой разработки.
