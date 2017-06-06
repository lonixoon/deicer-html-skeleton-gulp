

/* ===== КОНФИГУРАЦИЯ ПРОЕКТА ===== */

module.exports = {

    paths: {
        project: './',

        // Папки готового проекта
        build: {
            html:	 'build/',
            js:		 'build/js/',
            css:	 'build/css/',
            img:	 'build/img/',
            fonts:	 'build/fonts/',
            sprites: 'build/img/sprites/',
            svg:	 'build/svg/'
        },

        // Папки и файлы исходников
        src: {
            html:	 'src/pages/*.html',
            pug:	 'src/pages/*.pug',
            js:		 'src/scripts/main.js',
            less:	 'src/styles/styles.less',
            scss:	 'src/styles/styles.scss',
            img:	 'src/images/**/*.*',
            fonts:	 'src/fonts/**/*.*',
            sprites: 'src/images/sprites/*.png',
            svg:	 'src/images/svg/**/*.svg'
        },

        // Файлы в которых отслеживаются изменения
        watch: {
            html:	 'src/pages/**/*.html',
            pug:	 'src/pages/**/*.pug',
            js:		 'src/scripts/**/*.js',
            less:	 'src/styles/**/*.less',
            scss:	 'src/styles/**/*.scss',
            img:	 'src/images/**/*.*',
            fonts:	 'src/fonts/**/*.*',
            sprites: 'src/images/sprites/*.png',
            svg:	 'src/images/svg/**/*.svg'
        },

        // Папка для очистки
        clean: './build'
    },

    // Имена файлов в готовом проекте
    names: {
        css: 'styles.min.css',
        js:  'main.min.js',
        vendorjs: 'vendor.min.js'

    },

    // Настройки browserSync
    browserSync: { // Параметры локального сервера
        server: {
            baseDir: './build'  // Корневая папка локального сервера
        },
        tunnel: false,
        host: 'localhost',
        port: 9000,                   // Порт локального сервера
        logPrefix: 'frontend',
        logLevel: "info",
        online: true,
        open: true                    // Открывать в браузере автоматически?
    },

    // Настройки по умолчанию (для разработки)
    compress: {
        css: false,
        js: false,
        img: true
    },

    // Настройки pug
    pug: {
        pretty: true
    }
};
