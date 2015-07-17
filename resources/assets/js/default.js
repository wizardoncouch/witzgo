var app = new Vue({
    el: 'body',
    data: {
        view: 'wall-view',
        subView: '',
        showbackground: false
    },
    ready: function () {
        if (this.view == 'wall-view') {
            this.showbackground = true;
        }
    },
    components: {
        'background': {
            template: require('./views/background-video.template.html')
        },
        'page-header': require('./views/page-header'),
        'signin-view': require('./views/signin'),
        'signup-view': require('./views/signup'),
        'wall-view': require('./views/wall'),
        'popular-view': require('./views/popular'),
        'page-footer': {
            props:['date'],
            template:'<p class="text-center font-twelve">&copy; {{date}} All Rights Reserved. <br> by: Alex Culango</p>'
        }

    }
});

var routes = {
    '!/wall': function () {
        app.view = 'wall-view';
        app.subView = '';
        app.showbackground = true;
    },
    '!/signin': function () {
        app.view = 'signin-view';
        app.subView = '';
        app.showbackground = true;
    },
    '!/signup': function () {
        app.view = 'signup-view';
        app.subView = '';
        app.showbackground = true;
    },
    '!/popular': function () {
        window.location.href = "#!/popular/groups";
    },
    '!/popular/groups': function () {
        app.view = 'popular-view';
        app.subView = 'groups-view';
        app.showbackground = false;
    },
    '!/popular/itineraries': function () {
        app.view = 'popular-view';
        app.subView = 'itineraries-view';
        app.showbackground = false;
    },
    '!/popular/destinations': function () {
        app.view = 'popular-view';
        app.subView = 'destinations-view';
        app.showbackground = false;
    }
}
var router = Router(routes);
router.init();
