'use strict';

const gulp = require('gulp');
const brSync = require('browser-sync').create();
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('brSync', () => {
    brSync.init({
        server: {          
            baseDir: "./docs"
        },
    });
});

gulp.task('html', () => {   
    return gulp.src('app/common.blocks/index.html', { since: gulp.lastRun('html') })
        .pipe(gulp.dest('docs'))
        .pipe(brSync.reload({ stream: true }))
});

gulp.task('sass', () => {
    return gulp.src('app/common.blocks/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'nested',
        })
            .on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('docs/css'))
        .pipe(brSync.reload({ stream: true }))
});

gulp.task('watch', gulp.parallel('brSync', () => {
    gulp.watch('app/**/*.scss', gulp.parallel('sass'));
    gulp.watch('app/common.blocks/index.html', gulp.parallel('html'))
}));

gulp.task('default', gulp.parallel('html', 'watch', 'sass'));