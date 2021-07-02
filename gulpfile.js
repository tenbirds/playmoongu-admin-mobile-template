const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const connect = require('gulp-connect');
const fileinclude = require('gulp-file-include');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const javascriptObfuscator = require('gulp-javascript-obfuscator');
const babel = require('gulp-babel');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const plumber = require('gulp-plumber');

gulp.sources = {
    src: './src',
    dist: './dist'
};

gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: gulp.sources.dist
        }
    });
});

//HTML
gulp.task('html', () => {
    return gulp.src([gulp.sources.src + '/html/**/*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest(gulp.sources.dist))
        .pipe(browserSync.stream())
});

// Sass
gulp.task('sass', gulp.series(function () {
    return gulp.src(gulp.sources.src + '/scss/*.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({
            errorLogToConsole: true,
            outputStyle: 'compressed'
        }))
        .on('error', console.error.bind(console))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(gulp.sources.dist + '/css'))
        .pipe(browserSync.stream());
}));
gulp.task('sass_build', gulp.series(function () {
    return gulp.src(gulp.sources.src + '/scss/*.scss')
        .pipe(plumber())
        .pipe(sass({
            errorLogToConsole: true,
            outputStyle: 'compressed'
        }))
        .on('error', console.error.bind(console))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(gulp.sources.dist + '/css'))
}));

//JS
gulp.task('js', function () {
    gulp.src(['node_modules/babel-polyfill/dist/polyfill.js']).pipe(gulp.dest(gulp.sources.dist + '/js'))
    return gulp.src(
            [
                gulp.sources.src + '/js/**/*.js'
            ], {
                allowEmpty: true
            })
            .pipe(plumber())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(buffer())
        .pipe(sourcemaps.init({
            loadmaps: true
        }))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        // .pipe(javascriptObfuscator({
        //     compact: true,
        //     splitStrings: true,
        //     renameGlobals: true,
        //     // optionsPreset: 'high-obfuscation',
        //     transformObjectKeys: true
        // }))
        .pipe(gulp.dest(gulp.sources.dist + '/js'))
        .pipe(browserSync.stream());
});

//Files
gulp.task('files', () => {
    gulp.src(gulp.sources.src + '/manifest.json')
        .pipe(plumber())
        .pipe(gulp.dest(gulp.sources.dist + '/'))
    gulp.src(gulp.sources.src + '/fonts/**/*')
        .pipe(plumber())
        .pipe(gulp.dest(gulp.sources.dist + '/fonts'))
    return gulp.src(gulp.sources.src + '/images/**/*')
        .pipe(plumber())
        .pipe(gulp.dest(gulp.sources.dist + '/images'))
        .pipe(browserSync.stream());
});

//Beauti
gulp.task('prettify', ()=> {
    return gulp.src([gulp.sources.dist + '/*.html'])
        .pipe(prettify({
            indent_char: ' ',
            indent_size: 4
        }))
        .pipe(gulp.dest(gulp.sources.dist));
});

// Watch
gulp.task('watch', () => {
    gulp.watch(gulp.sources.src + '/html/*/*.html', gulp.series('html'));
    gulp.watch(gulp.sources.src + '/html/*.html', gulp.series('html'));
    gulp.watch(gulp.sources.src + '/scss/*.scss', gulp.series('sass'));
    gulp.watch(gulp.sources.src + '/scss/*/*.scss', gulp.series('sass'));
    gulp.watch(gulp.sources.src + '/js/*/*.js', gulp.series('js'));
    gulp.watch(gulp.sources.src + '/js/*.js', gulp.series('js'));
    gulp.watch(gulp.sources.src + '/fonts/*/*.js', gulp.series('files'));
    gulp.watch(gulp.sources.src + '/images/*/*.*', gulp.series('files'));
    gulp.watch(gulp.sources.src + '/fonts/*.js', gulp.series('files'));
    gulp.watch(gulp.sources.src + '/images/*.*', gulp.series('files'));
});

gulp.task('run', gulp.parallel(gulp.series([
    'html',
    'sass',
    'js',
    'files',
    'watch'
]), 'serve'));

gulp.task('build', gulp.parallel(gulp.series([
    'html',
    'sass_build',
    'js',
    'files'
])));
