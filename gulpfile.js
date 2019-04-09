var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var concatCSS = require('gulp-concat-css');
var ftp = require('gulp-ftp')


// Static Server + watching scss/html files

gulp.task('sass', function() {
    return gulp.src('src/sass/*.s?ss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
		.pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());

});

gulp.task('serve', function() {

   browserSync.init({
       server: "src/"
   });

   gulp.watch('src/sass/*.s?ss', gulp.series('sass'));
   // gulp.watch('src/*.html', gulp.series(function indexChange() {
   //     browserSync.reload();
   // }));
    gulp.watch('src/*.html').on('change', function() {
        browserSync.reload();
    });
    gulp.watch('src/js/*.js').on('change', function() {
        browserSync.reload();
    });
  
});

gulp.task('ftp', function () {
    return gulp.src('src/**')
        .pipe(ftp({
            host: 'website.com/ip_adress',
            user: 'johndoe',
            pass: '1234',
            remotePath: 'www/tyun.ru/stream'
        }))
        .pipe(gutil.noop());
});

gulp.task('default', gulp.series('sass', 'serve'));