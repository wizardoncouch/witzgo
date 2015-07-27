/**
 *
 * Created by lexus on 7/17/15.
 */


module.exports = {
    template: require('./signin.template.html'),
    data: function () {
        return {
            signin: {
                email: null,
                password: null,
                remember: null
            },
            hasError: false,
            errors: []
        }
    },
    ready: function () {
        if (sessionStorage.isLogged == 1) {
            window.location.href = '/';
        }
    },
    methods: {
        fbsignup: function () {
            FB.login(function (response) {
                    if (response.authResponse) {
                        console.log('Welcome');
                        var access_token = response.authResponse.accessToken;
                        var user_id = response.authResponse.userId;
                        FB.api('/me', function (response) {
                            var user_email = response.email;
                            var name = response.name;
                        });
                    } else {
                        console.log('The user cancelled the login');
                    }
                }, {
                    scope: 'public_profile,email'
                }
            );
        }
    }

}
