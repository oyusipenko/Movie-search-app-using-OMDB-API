'use strict';

const gulp = require('gulp');
const brSync = require('browser-sync').create();
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('brSync', () => {
    brSync.init({
        server: {          
            baseDir: "./public"
        },
    });
});

gulp.task('html', () => {   
    return gulp.src('public/*.html', { since: gulp.lastRun('html') })
        .pipe(brSync.reload({ stream: true }))  // перезагрузка страницы 
});

gulp.task('sass', () => {
    return gulp.src('app/common.blocks/style.scss')
        .pipe(sourcemaps.init())        // активируем gulp-sourcemaps 
        .pipe(sass({
            outputStyle: 'nested',
        })
            .on('error', sass.logError))
        .pipe(sourcemaps.write())   // создание карты css.map в текущей папке 
        .pipe(gulp.dest('public/css'))
        .pipe(brSync.reload({ stream: true }))
});

gulp.task('watch', gulp.parallel('brSync', () => {
    gulp.watch('app/**/*.scss', gulp.parallel('sass'));
    gulp.watch('public/*.html', gulp.parallel('html')) // следим за изменениями HTML 
}));

gulp.task('default', gulp.parallel('html', 'watch', 'sass')); // задача по умолчанию (gulp)