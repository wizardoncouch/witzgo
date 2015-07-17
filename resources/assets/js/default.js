var app = new Vue({
    el: 'body',
    data: {
        view: 'wall-view',
        subView: 'aha!'
    },
    components: {
        'page-header': require('./views/page-header'),
        'signin-view': require('./views/signin'),
        'signup-view': require('./views/signup'),
        'wall-view': require('./views/wall')

    }
});

var routes = {
    '/wall': function () {
        app.view = 'wall-view';
    },
    '/signin': function () {
        app.view = 'signin-view';
    },
    '/signup': function () {
        app.view = 'signup-view';
    }
}
var router = Router(routes);
router.init();
