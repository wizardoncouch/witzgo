var app = new Vue({
    el: 'body',
    data: {
        view: 'wall-view',
        subView: 'aha!',
        showbackground: false
    },
    components: {
        'background': {
            template: require('./views/background-video.template.html')
        },
        'page-header': require('./views/page-header'),
        'signin-view': require('./views/signin'),
        'signup-view': require('./views/signup'),
        'wall-view': require('./views/wall')

    }
});

var routes = {
    '/wall': function () {
        app.view = 'wall-view';
        app.showbackground = true;
    },
    '/signin': function () {
        app.view = 'signin-view';
        app.showbackground = true;
    },
    '/signup': function () {
        app.view = 'signup-view';
        app.showbackground = true;
    }
}
var router = Router(routes);
router.init();
