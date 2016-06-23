var
	gulp = require('gulp'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	pump = require('pump'),
	concat = require('gulp-concat');

var path = {
	js: 'src/pickemall.js',
	styles: 'src/styles/**/*.css',
	dist: 'dist/**/*.{css,js}',
	distDest: 'dist/',
	vendor: {
		html2canvas: 'node_modules/html2canvas/dist/html2canvas.js'
	}
};

/**
 * JS tasks
 */
gulp.task('js:build', function () {
	gulp.src([path.vendor.html2canvas, path.js])
		.pipe(concat('pickemall.js'))
		.pipe(gulp.dest(path.distDest));
});

gulp.task('js:watch', function () {
	gulp.watch(path.js, ['js:build']);
})

/**
 * Styles tasks
*/
gulp.task('styles:build', function () {
	gulp.src(path.styles)
		.pipe(gulp.dest(path.distDest));
});

gulp.task('styles:watch', function () {
	gulp.watch(path.styles, ['styles:build']);
});

/**
 * Global tasks
 */
gulp.task('compress', function () {
	pump([
		gulp.src(path.dist),
		uglify(),
		rename({ suffix: '.min' }),
		gulp.dest('./dist')
	]);
});

gulp.task('watch', ['js:watch', 'style:watch']);

gulp.task('build', ['js:build', 'styles:build', 'compress']);