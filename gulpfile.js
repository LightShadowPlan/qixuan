const gulp = require('gulp');
const server = require('gulp-webserver');
const sass = require('gulp-sass');
const webpack = require('webpack-stream');
const watch = require('gulp-watch');
const del = require('del');
const config = require('./config');

const { server_config, sass_config, webpack_config } = config;

//开启热更新服务器
gulp.task('server',() => {
    return gulp.src('./dist')
            .pipe(server(server_config))
})

//输出静态文件
gulp.task('copy:static',() => {
    return gulp.src('./src/static/**/*.*')
            .pipe(gulp.dest('./dist/static'));
})

//输出html页面
gulp.task('copy:html', () => {
    return gulp.src('./src/**/*.html')
            .pipe(gulp.dest('./dist/'));
})

//处理scss
gulp.task('compile:scss', () => {
    return gulp.src('./src/stylesheets/**/*.scss')
            .pipe(sass(sass_config).on('error', sass.logError))
            .pipe(gulp.dest('./dist/stylesheets'));
})

//模块化打包js
gulp.task('compile:js', () => {
    return gulp.src('./src/javascripts/**/*.js')
            .pipe(webpack(webpack_config))
            .pipe(gulp.dest('./dist/javascripts'))
})

//监听任务
gulp.task('watch',() => {
    gulp.watch('./src/**/*.html',['copy:html']);
    gulp.watch('./src/javascripts/**/*',['compile:js']);
    gulp.watch('./src/stylesheets/**/*.scss',['compile:scss']);
    gulp.watch('./src/static',['copy:static']);

    watch('src/static',(v) => {
        if (v.event === 'unlink'){
            let _path = v.history[0].replace('\src','\dist');
            del(_path);
        } else {
            gulp.start(['copy:static']);
        }
    })
})

//默认开启任务
gulp.task('default',['copy:html','compile:scss','compile:js','copy:static','server','watch'], () => {
    console.log('Everything is doing...');
})

