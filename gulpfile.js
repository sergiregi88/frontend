"use strict";

var gulp = require("gulp");
var _ =require("underscore");
var runSequence=require("gulp-run-sequence");
var defaultAssets = require('./config/default');
var plugins = require('gulp-load-plugins')({
	pattern: ['main-bower-files','gulp-*','del','merge-stream'],
 	 replaceString: /\bgulp[\-.]/,
   lazy:false
});
/*var isProd="";
gulp.task('env:dev',function(){

  process.env.NODE_ENV='dev'
  console.log(process.env.NODE_ENV)
})
gulp.task('env:prod',['init'],function(){
  process.env.NODE_ENV='prod';
})

var src = {
  sass: ['src//*.sass'],
  css: ['src.css'],
  js: ['src*.js'],
  bower: ['bower.json', '.bowerrc']
}
src.styles = src.sass.concat(src.css)
src.scripts = src.js.concat(src.js)

// Watch Files For Changes
gulp.task('watch', function() {
  // Start livereload
  plugins.livereload.listen();

  // Add watch rules

  gulp.watch(defaultAssets.client.views).on('change', plugins.livereload.changed);
  gulp.watch(defaultAssets.client.js, ['jshint']).on('change', plugins.livereload.changed);
  gulp.watch(defaultAssets.client.css, ['csslint']).on('change', plugins.livereload.changed);
  gulp.watch(defaultAssets.client.sass, ['sass', 'csslint']).on('change', plugins.livereload.changed);
  gulp.watch(defaultAssets.client.less, ['less', 'csslint']).on('change', plugins.livereload.changed);
});





gulp.task('bowerlibs',['deleteDist'], function() {
  var jsFilter =plugins.filter('*.js')
  var fontFilter= plugins.filter(['*.woff2','*.woff','*.ttf','*.svg','*.eot','*.otf']);

  return gulp.src(plugins.mainBowerFiles())
    .pipe(jsFilter)
    .pipe(plugins.concat('vendor.js'))
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.uglify())
    .pipe(plugins.rename({suffix:'.min'}))
    .pipe(plugins.sourcemaps.write('/maps'))
    .pipe(gulp.dest(srclib.js))
    .pipe(jsFilter.restore())
    .pipe(fontFilter)
    .pipe(plugins.rename(function(path) {
      if (path.dirname.indexOf('fonts')) {
        path.dirname = '/fonts'
      }
    }))
  .pipe(gulp.dest(srclib.vendor))
})


gulp.task('bowerSass',['deleteDist'],function(){
  var sassFilterBoot=plugins.filter("*bootstrap.scss");
  var sassFilterFont=plugins.filter("/font-awesome.scss");
  return plugins.merge(
    gulp.src(plugins.mainBowerFiles())
        .pipe(sassFilterBoot)
     //   .pipe(plugins.replace('fonts/bootstrap','fonts'))
        .pipe(plugins.sass({outputStyle:'nested'})),
    gulp.src(plugins.mainBowerFiles())
        .pipe(sassFilterFont)
        .pipe(plugins.sass({outputStyle:'nested'}))
    )
   .pipe(plugins.sourcemaps.init())
   .pipe(plugins.concat('vendor.css'))
  .pipe(plugins.minifyCss())
   .pipe(plugins.rename({suffix:'.min'}))
   .pipe(plugins.sourcemaps.write('/maps'))
   .pipe(gulp.dest(srclib.css))



});
  gulp.task('copylibs',['bowerSass','bowerlibs'],function(){
   return gulp.src(srclib.all).pipe(gulp.dest(distlib.all));
  })

//  gulp.task('copyfiles',['minifyHtml','minifyCss','minifiJs','refs'])

gulp.task('sass',['deleteDist'],function(){
    gulp.src(defaultAssets.client.sass)
    .pipe(plugins.sass())
    .pipe(isProd ? plugins.minifyCss() : plugins.util.noop())
    .pipe(isProd ? gulp.dest(distFiles.css):plugins.util.noop())


})

gulp.task("refs",['minifiJs'],function(){
  return gulp.src(srcfiles.html)
  .pipe(isProd ? plugins.useref():plugins.util.noop())
  .pipe(isProd ? gulp.dest(distdir):plugins.util.noop());

})

gulp.task('csslint', function (done) {
  return gulp.src(defaultAssets.client.css)
    .pipe(plugins.csslint('.csslintrc'))
    .pipe(plugins.csslint.reporter())
    .pipe(plugins.csslint.reporter(function (file) {
      if (!file.csslint.errorCount) {
        done();
      }
    }));
});
gulp.task('jshint', function () {
  return gulp.src(_.union(defaultAssets.server.allJS, defaultAssets.client.js, testAssets.tests.server, testAssets.tests.client, testAssets.tests.e2e))
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('default'))
    .pipe(plugins.jshint.reporter('fail'));
});

gulp.task('lint', function(done) {
  plugins.runSequence('sass', ['csslint', 'jshint'], done);
});

// Lint project files and minify them into two production files.
gulp.task('build', function(done) {
  plugins.runSequence('env:dev' ,'lint', ['bowerlibs', 'bowerSass'], done);
});

// Run the project in development mode
gulp.task('default', function(done) {
  plugins.runSequence('env:dev', 'lint', [ 'watch'], done);
});

gulp.task('prod', function(done) {
  plugins.runSequence('build', 'lint', [ 'watch'], done);
});

gulp.task("libsjsScss",['bowerlibs','bowerSass'])

gulp.task("prod",['copylibs','copyfiles']);

gulp.task("default",['set-env-dev']);

gulp.task('dev',['copyfiles'])*/

//gulp.task('init',['copyfiles'])





gulp.task('deleteDist',function(cb){
  plugins.del('./dist',cb);
})
gulp.task('csslint',['scssCompile'], function (done) {
  return gulp.src(defaultAssets.client.css)
    .pipe(plugins.csslint('.csslintrc'))
    .pipe(plugins.csslint.reporter())
    .pipe(plugins.csslint.reporter(function (file) {
      if (!file.csslint.errorCount) {
        done();
      }
    }));
});

gulp.task('scsslint', function (done) {
  return gulp.src(defaultAssets.client.scss)
    .pipe(plugins.scssLint({'config': 'default.yml',customReport: myCustomReporter}));
});
var myCustomReporter = function(file) {
  if (!file.scsslint.success) {
    plugins.util.log(file.scsslint.issues.length + ' issues found in ' + file.path);
    for(var i=0;i<file.scsslint.issues.length;i++)
    {
        plugins.util.log(" Severity : ",file.scsslint.issues[i].severity," Line : ",file.scsslint.issues[i].line," Column : "+ file.scsslint.issues[i].column+" Reason : "+ file.scsslint.issues[i].reason)
    }
  }
};
gulp.task('jshint', function () {
  return gulp.src(defaultAssets.client.js)
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('default'))
    .pipe(plugins.jshint.reporter('fail'));
});

gulp.task('linter',function(done){
  runSequence('jshint','scsslint','csslint',done);
})

gulp.task('minifyHtml',function(){

  gulp.src(defaultAssets.client.html)
  .pipe(plugins.minifyHtml())
    .pipe(gulp.dest('./dist'))

})

gulp.task('minifiJs',['jshint'],function(){
  gulp.src(defaultAssets.client.js)
  .pipe(plugins.ngAnnotate())
  .pipe(plugins.concat('total.min.js'))
  .pipe(plugins.uglify())
  .pipe(gulp.dest('./dist/js'))}

)

gulp.task('cssMinify',['scssCompile'],function(){
  return  gulp.src(defaultAssets.client.css)
  .pipe(plugins.concat('app.css'))
  .pipe(gulp.dest('./src/cssgen'))
  .pipe(plugins.minifyCss())
  .pipe(plugins.rename('app.min.css'))
  .pipe(gulp.dest('./dist/css'))


})

gulp.task('scssCompile',['scsslint'],function(){
  return  gulp.src(defaultAssets.client.scss)
    .pipe(plugins.sass())
    .pipe(gulp.dest('./src/css'))
})


gulp.task('builddev',function(){
  runSequence('cssMinify','minifyHtml','minifiJs')
})


gulp.task('bowerjslibs', function() {
  var jsFilter =plugins.filter('*.js')


  return gulp.src(defaultAssets.client.lib.js)
    .pipe(plugins.concat('vendor.js'))
    .pipe(plugins.sourcemaps.init())
   // .pipe(plugins.uglify())
    .pipe(plugins.rename({suffix:'.min'}))
    .pipe(plugins.sourcemaps.write('maps'))
    .pipe(gulp.dest('./src/vendor/js'))



    //
})

gulp.task('bowerfonts',function(){
   var fontFilter= plugins.filter(['*.woff2','*.woff','*.ttf','*.svg','*.eot','*.otf']);
  gulp.src('.bowe_components/**/*')
   .pipe(fontFilter)
  .pipe(plugins.rename(function(path) {
      if (path.dirname.indexOf('fonts')) {
        path.dirname = '/fonts'
      }
    }))
  .pipe(gulp.dest('./src/vendor'))
})

gulp.task('bowerSass',function(){
  var sassFilterBoot=plugins.filter("*bootstrap.scss");
  var sassFilterFont=plugins.filter("/font-awesome.scss");
  return plugins.merge(
    gulp.src(plugins.mainBowerFiles())
        .pipe(sassFilterBoot)
     //   .pipe(plugins.replace('fonts/bootstrap','fonts'))
        .pipe(plugins.sass({outputStyle:'nested'})),
    gulp.src(plugins.mainBowerFiles())
        .pipe(sassFilterFont)
        .pipe(plugins.sass({outputStyle:'nested'}))
    )
   .pipe(plugins.sourcemaps.init())
   .pipe(plugins.concat('vendor.css'))
  .pipe(plugins.minifyCss())
   .pipe(plugins.rename({suffix:'.min'}))
   .pipe(plugins.sourcemaps.write('maps'))
   .pipe(gulp.dest('./src/vendor/css'))



});


  gulp.task('copylibslib',['bowerSass','bowerjslibs','bowerfonts'],function(){
   return gulp.src('./src/vendor/**/*').pipe(gulp.dest('./dist/vendors'));
  })
gulp.task('minifyLibs',['bowerSass','bowerjslibs','bowerfonts']);