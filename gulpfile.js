'use strict';

/* ======== ПОДКЛЮЧЕНИЕ ПЛАГИНОВ ======== */

var gulp         = require('gulp'),                         // gulp

    // Общие плагины gulp
    argv         = require('yargs').argv,                   // Разбор опций командной строки gulp
    gulpif       = require('gulp-if'),                      // Управление потоками выполнения gulp
    plumber      = require('gulp-plumber'),                 // Перехват ошибок
    browserSync  = require('browser-sync'),                 // Автоперезагрузка браузера
    gutil        = require('gulp-util'),                    // Различные вспомогательные утилиты

    // Работа с файлами
    path         = require('path'),                         // Модуль Node для работы с файловыми путями
    watch        = require('gulp-watch'),                   // Отслеживание изменений в файлах проекта
    del          = require('del'),                          // Удаление файлов и папок
    rigger	     = require('gulp-rigger'),                  // Плагин позволяет импортировать один файл в другой
    rename       = require('gulp-rename'),                  // Для переименования файлов
    concat       = require('gulp-concat'),                  // Конкатенация (соединение) файлов
    cache        = require('gulp-cache'),                   // Плагин для кеширования файлов
    newer        = require('gulp-newer'),                   // Работа только с изменившимися файлами

    // Работа с Javascript
    uglify       = require('gulp-uglify'),                  // Минификация JavaScript

    // Работа с HTML
    htmlmin      = require('gulp-htmlmin'),                 // Минификация HTML
    pug          = require('gulp-pug'),                     // Шаблонизатор pug (jade)

    // Работа с CSS
    sass	     = require('gulp-sass'),                    // Препроцессор SASS
    less         = require('gulp-less'),                    // Препроцессор LESS
    csso         = require('gulp-csso'),                    // Минификация CSS
    autoprefixer = require('gulp-autoprefixer'),            // Автоматическое добавление префиксов в CSS
    queries      = require('gulp-group-css-media-queries'), // Объединение медиа запросов

    // Работа с изображениями
    imagemin     = require('gulp-imagemin'),                // Сжатие и оптимизация изображений
    pngquant     = require('imagemin-pngquant'),            // Оптимизация PNG изображений

    // Развертывание проекта (FTP, Github и т.п.)
    ftp          = require('vinyl-ftp');                    // Работа с FTP

/* ===================================== */


/* ============= ПЕРЕМЕННЫЕ ============ */

    // Загрузка кофигурации проекта
    var cfg          = require('./config');

    // Перезагрузка сервера
    var reload = browserSync.reload;

    // Перехват ошибок
    var err = {
        errorHandler: function (error) {
            gutil.log('Error: ' + error.message);
            gutil.beep();
            this.emit('end');
        }
    };
/* ===================================== */


/* ============ PRODUCTION? ============ */

    // Узнаем какая конфигуцация (dev или production)
    var production = argv.production;

    // Если gulp запущен с ключом production, включаем минификацию
    if (production) {
            cfg.compress = {
                html: false,  // !!! Внимание для production html-минификация тоже отключена, включить если нужно !!!
                css: true,
                js:  true,
                img: true
            };
            cfg.pug.pretty=false; // !!! Внимание для production html-минификация у pug тоже отключена.
    }
/* ===================================== */


/* =========== ТАСК "CLEAN" ============ */

    // Удаление папки сборки
    gulp.task('clean', function() {
        console.log('---------- Очистка папки сборки');
        return del.sync(cfg.paths.clean);
    });
/* ===================================== */


/* ======== ТАСК "SERVER" ======== */

    //Запускаем локальный сервер
    gulp.task('server', function() {
        console.log('---------- Запуск локального сервера');
        browserSync(cfg.browserSync);
    });
/* ===================================== */


/* =========== ТАСК "HTML" ============= */

// Сборка HTML
gulp.task('html', function () {
    console.log('---------- Сборка HTML');
    return gulp.src(cfg.paths.src.html)                         // Выбираем файлы по нужному пути
        .pipe(plumber(err))                                     // Отслеживаем ошибки
        .pipe(rigger())                                         // Обьединяем HTML через rigger
        .pipe(gulpif(cfg.compress.html,htmlmin(cfg.htmlmin)))   // Минифицируем HTML если нужно (см. настройки)
        .pipe(gulp.dest(cfg.paths.build.html))                  // Копируем в папку назначения
        .pipe(reload({stream: true}));                          // Перезагружаем сервер
});
/* ===================================== */

/* =========== ТАСК "PUG" ============= */

// Компиляция pug/jade шаблонов
gulp.task('pug', function () {
    console.log('---------- Компиляция pug/jade шаблонов');
    return gulp.src(cfg.paths.src.pug)                          // Выбираем файлы по нужному пути
        .pipe(plumber(err))                                     // Отслеживаем ошибки
        .pipe (pug(cfg.pug))                                    // Компилируем pug-шаблоны
        .pipe(gulp.dest(cfg.paths.build.html))                  // Копируем в папку назначения
        .pipe(reload({stream: true}));                          // Перезагружаем сервер
});
/* ===================================== */


