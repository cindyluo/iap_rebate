var gulp = require('gulp');
var babel = require('gulp-babel');
var babelify = require('babelify');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var browserify = require('gulp-browserify');
var gutil = require('gulp-util');
var version = require('gulp-version-number');

const versionConfig = {
  'value': '%MDS%',
  'append': {
    'key': 'v',
    'to': ['css', 'js', 'image'],
  },
};


gulp.task('js', () => {
  gulp.src('./assets/js/*.js')
    .pipe(babel({
      ignore: 'gulpfile.babel.js',
      "presets": ["es2015"],
      "plugins": [
        ["transform-es2015-classes", { "loose": true }],
        "transform-proto-to-assign"
      ]
    }))
    .on('error', gutil.log)
    .pipe(gulp.dest('./static/js'));
});

gulp.task('styles', function() {
  gulp.src('./assets/scss/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(gulp.dest('./static/css'));
});

gulp.task('images', function() {
  gulp.src('./assets/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./static/images'));
});

gulp.task('fonts', () => {
  gulp.src('./assets/fonts/**/*')
    .pipe(gulp.dest('static/fonts'));
});

gulp.task('html', () => {
  gulp.src('src/*.html')
    .pipe(version(versionConfig))
    .pipe(gulp.dest('.'));
});

gulp.task('watch', () => {
  gulp.watch('./assets/js/*.js', ['js']);
  gulp.watch('./assets/scss/*.scss', ['styles']);
  gulp.watch('./assets/images/*', ['images']);
  gulp.watch('./assets/fonts/*', ['fonts']);
  gulp.watch('./src/*.html', ['html']);
});

gulp.task('default', ['js', 'styles', 'images', 'fonts', 'html']);
