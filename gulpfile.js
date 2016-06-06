/// <binding Clean='clean' />
"use strict";

var gulp = require("gulp"),
    rimraf = require("rimraf"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
	git = require("gulp-git"),
	sass = require('gulp-sass'),
    uglify = require("gulp-uglify"),
	project = require("./project.json");

var webroot = "./wwwroot/";

var paths = {
    js: webroot + "js/**/*.js",
    minJs: webroot + "js/**/*.min.js",
    css: webroot + "css/**/*.css",
    minCss: webroot + "css/**/*.min.css",
    concatJsDest: webroot + "js/site.min.js",
    concatCssDest: webroot + "css/site.min.css",
	vendorCss : "css/vendor/**/*.css",
	gitlib: "../../git-lib"
};

var libs = {
	bootstrapv3 : "https://github.com/twbs/bootstrap.git"
};

gulp.task("clean:js", function (cb) {
    rimraf(paths.concatJsDest, cb);
});

gulp.task("clean:css", function (cb) {
    rimraf(paths.concatCssDest, cb);
});

gulp.task("clean", ["clean:js", "clean:css"]);

gulp.task("min:js", function () {
    return gulp.src([paths.js, "!" + paths.minJs], { base: "." })
        .pipe(concat(paths.concatJsDest))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

gulp.task("min:css", function () {
    return gulp.src([paths.css, "!" + paths.minCss])
        .pipe(concat(paths.concatCssDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task("min", ["min:js", "min:css"]);

///New tasks
gulp.task("git:clone", function () {
    git.clone(libs.bootstrapv3, { args: '--branch v4-dev --single-branch' , cwd: paths.gitlib + '/bootstrapv4/' }, function (err) {
        if (err) throw err;
    });
});

gulp.task("git:pull", function () {
    git.pull('origin', 'v4-dev', { cwd: paths.gitlib + "/bootstrapv4/bootstrap" }, function (err) {
        if (err) throw err;
    });
});


gulp.task('sass:bootstrap', function() {
    gulp.src(paths.gitlib + '/bootstrapv4/bootstrap/scss/bootstrap.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(paths.webroot + 'css/vendor/'));
});