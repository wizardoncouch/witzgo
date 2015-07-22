var app = new Vue({
    el: 'body',
    data: {
        view: 'wall',
        sub: '',
        isUser: false,
        isLogged: false,
        user: {
            id: null,
            username: null,
            first_name: null,
            last_name: null
        }
    },
    components: {
        'page-header': require('./views/page-header'),
        'signin': require('./views/signin'),
        'signup': require('./views/signup'),
        'wall': require('./views/wall'),
        'browse': require('./views/browse'),
        'page-footer': {
            props: ['date'],
            template: '<p class="text-center font-twelve">&copy; {{date}} All Rights Reserved. <br> by: Alex Culango</p>'
        }

    }
});
