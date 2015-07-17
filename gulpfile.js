var elixir = require('laravel-elixir');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

var paths = {
    'jquery': './vendor/bower_components/jquery/',
    'vue': './vendor/bower_components/vue/',
    'resource': './vendor/bower_components/vue-resource/',
    'director': './vendor/bower_components/director/',
    'bootstrap': './vendor/bower_components/bootstrap-sass-official/assets/',
    'fontawesome': './vendor/bower_components/fontawesome/',
    'social': './vendor/bower_components/bootstrap-social/'
}

elixir(function (mix) {
    mix.sass("*", 'public/css/', {includePaths: [paths.bootstrap + 'stylesheets', paths.fontawesome + 'scss', paths.social]})
        .copy(paths.bootstrap + 'fonts/bootstrap/**', 'public/fonts/bootstrap')
        .copy(paths.fontawesome + 'fonts/**', 'public/fonts/fontawesome')
        .scripts([
            paths.jquery + "dist/jquery.js",
            paths.bootstrap + "javascripts/bootstrap.js",
            paths.vue + "dist/vue.js",
            paths.resource + "dist/vue-resource.js",
            paths.director + "build/director.js",
            "resources/assets/js/ie10-viewport-bug-workaround.js"
        ], 'public/js/vendor.js', './')
        .browserify('default.js', 'public/js/default.js')
        .browserify('user.js', 'public/js/user.js')
        .browserify('admin.js', 'public/js/admin.js')
        .version([
            'css/app.css',
            'js/vendor.js',
            'js/default.js',
            'js/user.js',
            'js/admin.js'
        ]);
});

