/**
 *
 * Created by lexus on 7/17/15.
 */


module.exports = {
    template: require('./signin.template.html'),
    data: function () {
        return {
            signin: {
                user: '',
                password: '',
                remember: ''
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
        fbsignin: function () {
            FB.login(function (response) {
                if (response.authResponse) {
                    FB.api('/me?fields=first_name,last_name,gender,email', function (response) {
                        var fb_data = {
                            'first_name': response.first_name,
                            'last_name': response.last_name,
                            'email': response.email,
                            'gender': response.gender,
                            'id': response.id
                        }
                        $.ajax({
                            url: '/api/1.0/auth/fbsignin',
                            method: 'POST',
                            data: fb_data
                        }).done(function (response) {
                            sessionStorage.token = response.token;
                            sessionStorage.isLogged = 1;
                            sessionStorage.logged = JSON.stringify(response);
                            window.location.href = '/' + response.username;
                        });
                    });
                }
            }, {
                scope: 'email'
            });
        },
        submit: function () {
            this.validate();
            if (this.hasError === false) {
                var self = this;
                $.ajax({
                    url: '/api/1.0/auth/signin',
                    method: 'POST',
                    data: self.signin
                }).done(function (response) {
                    sessionStorage.token = response.token;
                    sessionStorage.isLogged = 1;
                    sessionStorage.logged = JSON.stringify(response);
                    window.location.href = '/' + response.username;
                }).fail(function (xhr) {
                    self.hasError = true;
                    self.signin.password = '';
                    var response = xhr.responseJSON;
                    for (var i in response) {
                        self.errors.push(response[i]);
                    }
                });
            }
        },
        validate: function () {
            this.errors = [];
            this.hasError = false;
            if (this.signin.user.trim().length == 0) {
                this.hasError = true;
                this.errors.push('email or username field is required.');
            }
            if (this.signin.password.trim().length == 0) {
                this.hasError = true;
                this.errors.push('password field is required.');
            }
            if (this.hasError) {
                this.signin.password = '';
            }
        }
    }

}
