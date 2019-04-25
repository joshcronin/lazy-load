const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const webserver = require('gulp-webserver');

gulp.task('build', () => {
    return gulp.src('./src/positive-lazy-load.js')
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
});

gulp.task('serve', () => {
    gulp.src('./')
        .pipe(webserver({
            host: '0.0.0.0',
            port: 8000,
            livereload: true,
            directoryListing: true,
            open: 'http://127.0.0.1:8000/index.html'
        }));
    gulp.watch('./src/**/*', gulp.series('build'));
});

gulp.task('default', gulp.series('build', 'serve'));