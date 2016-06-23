var
    gulp = require('gulp'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    uglifycss = require('gulp-uglifycss'),
    jslint = require('gulp-jslint'),
    concat = require('gulp-concat'),
    gutil = require('gulp-util');

var path = {
    js: './src/pickemall.js',
    styles: './src/styles/**/*.css',
    distJs: './dist/**/!(*.min).js',
    distCss: './dist/**/!(*.min).css',
    distDest: './dist',
    vendor: {
        html2canvas: './src/html2canvas.js'
    }
};

/**
 * JS tasks
 */

gulp.task('js:compress', function () {
    return gulp.src(path.distJs)
        .pipe(uglify().on('error', gutil.log))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(path.distDest));
});

gulp.task('js:build', function () {
    return gulp.src([path.vendor.html2canvas, path.js])
        .pipe(concat('pickemall.js'))
        .pipe(gulp.dest(path.distDest));
});

gulp.task('js:watch', function () {
    gulp.watch(path.js, ['build']);
})

/**
 * Styles tasks
*/
gulp.task('styles:compress', function () {
    return gulp.src(path.distCss)
        .pipe(uglifycss()).on('error', gutil.log)
        .pipe(uglifycss({
            "maxLineLen": 80,
            "uglyComments": true
        }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(path.distDest))
})

gulp.task('styles:build', function () {
    return gulp.src(path.styles)
        .pipe(gulp.dest(path.distDest));
});

gulp.task('styles:watch', function () {
    gulp.watch(path.styles, ['build']);
});

/**
 * Global tasks
 */

gulp.task('compress', ['js:compress', 'styles:compress']);

gulp.task('watch', ['build', 'js:watch', 'styles:watch']);

gulp.task('build', ['js:build', 'styles:build'], function () {
    gulp.start('compress');
}).on('error', gutil.log);