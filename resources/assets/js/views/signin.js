/**
 *
 * Created by lexus on 7/17/15.
 */


module.exports = {
    data: function () {
        return {
            signin: {
                email: null,
                password: null,
                remember: null
            },
            hasError:false,
            errors:[]
        }
    },
    ready: function () {
        var token = Cookies.get('authorization');
        if (token) {
            window.location.href = '/';
        }
    },

    template: require('./signin.template.html')
}
