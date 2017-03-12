# Frontend Boilerplate. Gulp/Webpack/ES2015
Простой шаблон frontend-проекта c использованием Gulp и Webpack

- Gulp 4+
- Версия ECMAScript: ES2015 (ES6)

## Использование
### Зависимости
Необходимо установить [Node.js](https://nodejs.org/en/), версию не ниже 6.4.0

### Установка
```
$ npm install
```

### Запуск
Запуск сборки в режиме разработки с локальным сервером

```
$ npm start
```

### Сборка
Сборка проекта в режиме разработки

```
$ npm run build
```

Сборка проекта c минификацией JS, CSS и изображений

```
$ npm run build:prod
```

### Тестирование
Поиск несоответствий стандарту оформления и проблем в JavaScript

```
$ npm run lint
```

### Удаление
Удаление всех созданных каталогов (/build, /tmp), скомпилированных и скопированных файлов

```
$ npm run clean 
```

## Настроки и конфигурации

### Изменение инофрмации о проекте
В файле `package.json` можно изменить имя, версию, URL и прочую информацию о проекте

### Конфигурации сборки
В файле `/gulp/config.js` находится конфигурация сборки: пути, настройки Gulp плагинов и прочее

## NPM
### Используемые пакеты

- [babel-core](https://www.npmjs.com/package/babel-core) - универсальный многоцелевой компилятор для JavaScript
- babel-eslint - парсер для ESLint
- [babel-loader](https://www.npmjs.com/package/babel-loader) - модуль для Babel. Webpack загрузчик
- [babel-preset-es2015](https://www.npmjs.com/package/babel-preset-es2015) - пресет ES2015 для Babel
- [browser-sync](https://www.npmjs.com/package/browser-sync) - Live Reload инструмент  
- [del](https://www.npmjs.com/package/del) - удаление файлов и папок
- [eslint](https://www.npmjs.com/package/eslint) - осуществляет поиск несоответствий стандарту оформления и проблем в JavaScript 
- [gulp](https://www.npmjs.com/package/gulp) - инструмент сборки веб-приложения
- [gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer) - добавляет префиксы в CSS
- [gulp-cssnano](https://www.npmjs.com/package/gulp-cssnano) - CSS минификатор
- [gulp-debug](https://www.npmjs.com/package/gulp-debug)- инструмент для отладки при работе с Gulp задачами
- [gulp-if](https://www.npmjs.com/package/gulp-if) - условный запуск задач в Gulp
- [gulp-imagemin](https://github.com/sindresorhus/gulp-imagemin) - минификация png, jpg, gif и svg изображений
- [gulp-pug](https://www.npmjs.com/package/gulp-pug) - компиляция pug-шаблонов (бывший jade)
- [gulp-load-plugins](https://www.npmjs.com/package/gulp-load-plugins) - автоматически загружает Gulp плагины из вашего package.json
- [gulp-notify](https://www.npmjs.com/package/gulp-notify) - Gulp плагин для вывода уведомлений
- [gulp-sass](https://www.npmjs.com/package/gulp-sass) - компиляция sass
- [gulp-sass-glob](https://www.npmjs.com/package/gulp-sass-glob) - глобальный импорт для sass/scss файлов
- [gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps) - поддержка source map для Gulp
- [gulp.spritesmith](https://www.npmjs.com/package/gulp.spritesmith) - создание CSS-спрайтов
- [gulp.spritesmith-multi](https://www.npmjs.com/package/gulp.spritesmith-multi) - обертка для gulp.spritesmith. Создание множества спрайтов и стилей
- [gulplog](https://www.npmjs.com/package/gulplog) - логирование для Gulp и Gulp плагинов
- [stream-combiner2](https://www.npmjs.com/package/stream-combiner2) - объединение потоков
- [vinyl-named](https://www.npmjs.com/package/vinyl-named) - присваивает vinyl файлам chunk имена. В зависимости от этого имени файл попадает в ту или иную сборку
- [webpack](https://www.npmjs.com/package/webpack) - система сборки бандлов и оптимизации модулей JavaScript и других ресурсов
- [webpack-stream](https://www.npmjs.com/package/webpack-stream) - помогает Webpack подружить с Gulp потоками

### Добавление пакета
1. Устанавливаем пакет `$ npm install --save-dev package-name`
2. Подключаем пакет в нужную Gulp задачу `/gulp/tasks`. При необходимости можно создать новую задачу
3. Выносим настройки пакета в `/gulp/config.js`. Обратите внимание, имена корневых свойств в `config.js` соответствуют именам Gulp задач. Находим нужное нам имя задачи и добавляем в него свойство `packageName: {}`. Далее эти параметры будут доступны в задаче через `options.packageName`
4. Добавляем информацию в `README.md` "Используемые пакеты". Имя, ссылка и краткое описание
