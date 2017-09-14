	var gulp = require('gulp');
	const imagemin = require('gulp-imagemin');
	var clean = require('gulp-clean');
	var sass = require('gulp-sass');
	var concat = require('gulp-concat');
	var uglify = require('gulp-uglify-es').default;


    /*

	    -- TOP LEVEL FUNCTIONS
	    gulp.task == defines tasks
	    gulp.src == points to files to use
	    gulp.dest == points to folder to use
	    gulp.watch == watch files and folders changes
	    */


	gulp.task('message', function(){
	    return console.log("Gulp is running.. ");
	});
	//copy all html files
	gulp.task('copyHtml', function() {
	    gulp.src('client/views/*.html')
	        .pipe(gulp.dest('dist'));
	});

	//optimize images-- using imagemin
	gulp.task('imageMin', () =>
	    gulp.src('client/images/*')
	    .pipe(imagemin())
	    .pipe(gulp.dest('dist/images'))
	);
	gulp.task('sass', function(){
		gulp.src('client/stylesheets/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('dist/css'));

	});
	gulp.task('scripts', function(){
		gulp.src('client/javascripts/*.js')
		.pipe(concat('main.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'));
	});

		gulp.task('default', ['message', 'copyHtml', 'imageMin', 'sass', 'scripts']);

	gulp.task('watch', function(){
		gulp.watch('client/javascripts/*.js', ['scripts']);
		gulp.watch('client/stylesheets/*.scss', ['sass']);
		gulp.watch('client/images/*', ['imageMin']);
		gulp.watch('client/views/*.html', ['copyHtml']);
	});
