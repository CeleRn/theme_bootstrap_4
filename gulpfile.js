'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    watch = require('gulp-watch');



// Пути проекта
var path = {
  dist: { //Тут мы укажем куда складывать готовые после сборки файлы
    lib: 'static/lib/',
    style: 'static/css/'
  },
  src: { //Папки где храняться исходники (создаваемые вручную и копируемые из bower_components)
    node: 'node_modules/',
    style: 'source/scss/'
  }
}

var files = {
    src: { //Файлы, откуда брать исходники
        style: path.src.style + 'main.scss'
        },
    watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        style: path.src.style + '**/*.scss'
    }
};

//Копирование  Bootstrap
gulp.task('bootstrap:copy', function () {
  gulp.src(path.src.node + 'bootstrap/**/*')
    .pipe(gulp.dest(path.dist.lib + 'bootstrap'));
});

//Копирование jQuery
gulp.task('jquery:copy', function () {
  gulp.src(path.src.node + 'jquery/**/*')
    .pipe(gulp.dest(path.dist.lib + 'jquery'));
});

//Копирование popper.js
gulp.task('popper:copy', function () {
  gulp.src(path.src.node + 'popper.js/**/*')
    .pipe(gulp.dest(path.dist.lib + 'popper.js'));
});

gulp.task('copy', [
  'bootstrap:copy',
  'jquery:copy',
  'popper:copy'
]);


//Сборка CSS
gulp.task('style:build', function () {
    gulp.src(files.src.style) //Выберем наш main.scss
        .pipe(sass().on('error', sass.logError)) //Скомпилируем
        // .pipe(prefixer()) //Добавим вендорные префиксы
        //.pipe(cssmin()) //Сожмем
        // .pipe(replace('..', domainStatic))
        .pipe(gulp.dest(path.dist.style)) //И в build
        // .pipe(livereload())
});






gulp.task('watch', function(){
    watch([files.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
});










gulp.task('default', function(callback) {
	'copy'
});