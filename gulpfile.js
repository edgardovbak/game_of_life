var gulp = require('gulp');
var connect = require('gulp-connect');

gulp.task('webserver', function(done) {
  return connect.server({
    root: 'src',
    livereload: false,
    port: 7000,
  });
});


gulp.task('watch', gulp.series(function() {
  return gulp.watch('src/**/*.js');
}));

gulp.task('default', gulp.series('webserver', 'watch'));