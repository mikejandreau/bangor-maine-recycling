"use strict";

// Load plugins
const autoprefixer = require("gulp-autoprefixer");
const browsersync = require("browser-sync").create();
const cleanCSS = require("gulp-clean-css");
const del = require("del");
const gulp = require("gulp");
const header = require("gulp-header");
const merge = require("merge-stream");
const plumber = require("gulp-plumber");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const uglify = require("gulp-uglify");
const concat = require('gulp-concat');

// Load package.json for banner
const pkg = require('./package.json');

// Banner content
const banner = ['/*!\n',
  ' * Losaidos Design - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
  ' * Copyright 2019 - ' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
  ' * Licensed under <%= pkg.license %> (https://github.com/mikejandreau/<%= pkg.name %>/blob/master/LICENSE)\n',
  ' */\n',
  '\n'
].join('');

// BrowserSync
function browserSync(callback) {
  browsersync.init({
    injectChanges: true,
    files: ['./src/styles/**/*.scss', 
            './src/scripts/**/*.js'],
    server: {
      baseDir: "./"
    },
    port: 3200
  });
  callback();
}

// BrowserSync reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}


// CSS task
function css() {
  return gulp
    .src("./src/styles/**/*.scss")
    .pipe(plumber())
    .pipe(sass({
      outputStyle: "expanded",
      // includePaths: "./node_modules",
    }))
    .on("error", sass.logError)
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(header(banner, {
      pkg: pkg
    }))
    .pipe(gulp.dest("./css"))
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(cleanCSS())
    .pipe(gulp.dest("./css"))
    .pipe(browsersync.stream());
}

// JS task
function js() {
  return gulp
    .src("./src/scripts/**/*.js")
    .pipe(concat('scripts.js'))
    .pipe(uglify())
    .pipe(header(banner, {
      pkg: pkg
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./js'))
    .pipe(browsersync.stream());
}

// Watch files
function watchFiles() {
  gulp.watch("./src/styles/**/*.scss", css);
  gulp.watch("./src/scripts/**/*.js", js);
  gulp.watch("./**/*.html", browserSyncReload);
}

// Define tasks
const build = gulp.series(gulp.parallel(css, js));
const watch = gulp.series(build, gulp.parallel(watchFiles, browserSync));

// Export tasks
exports.css = css;
exports.js = js;
exports.build = build;
exports.watch = watch;
exports.default = build;
