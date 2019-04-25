const path = require('path');
const gulp = require('gulp');
const babelify = require('babelify');
const uglify = require('gulp-uglify');
const webserver = require('gulp-webserver');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

gulp.task('build', () => {
    return browserify(path.join('./src/', 'positive-lazy-load.js'), {debug: false})
        .transform(babelify, {
            presets: ["@babel/preset-env"]
        })
        .bundle()
        .pipe(source('positive-lazy-load.js'))
        .pipe(buffer())
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