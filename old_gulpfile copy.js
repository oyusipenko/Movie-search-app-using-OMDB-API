const gulp = require('gulp');
const sass = require('gulp-sass')

gulp.task(scss);

function scss(){
    return gulp.src('app/common.blocks/style.scss')
        .pipe(sass())
        .pipe(gulp.dest('./public/css'))
}

gulp.task(watch);

function watch(){
    gulp.watch('app/common.blocks/**/*.scss', scss)
}