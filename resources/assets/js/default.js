var app = new Vue({
    el: 'body',
    data: {
        view: 'wall',
        sub: ''
    },
    components: {
        'page-header': require('./views/page-header'),
        'signin': require('./views/signin'),
        'signup': require('./views/signup'),
        'wall': require('./views/wall'),
        'browse': require('./views/browse'),
        'page-footer': {
            props: ['date'],
            template: '<p class="text-center font-twelve">&copy; {{date}} All Rights Reserved. <br> by: <a href="http://wizardoncouch.com" target="_blank">wizardoncouch</a></p>'
        }

    }
});
