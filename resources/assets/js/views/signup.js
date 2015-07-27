/**
 *
 * Created by lexus on 7/17/15.
 */


module.exports = {
    data: function () {
        return {
            signup: {
                first_name: '',
                last_name: '',
                email: '',
                password: '',
                gender: ''
            },
            hasError: false,
            success: false,
            errors: []
        }
    },
    ready: function () {
        if (sessionStorage.isLogged == 1) {
            window.location.href = '/';
        }
    },
    template: require('./signup.template.html'),
    methods: {
        fbsignin: function () {
            FB.signin(function (response) {
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
                    url: '/api/1.0/auth/signup',
                    method: 'POST',
                    data: self.signup
                }).done(function () {
                    self.success = true;
                    self.signup = {
                        first_name: '',
                        last_name: '',
                        email: '',
                        password: '',
                        gender: 'm'
                    };
                }).fail(function (xhr) {
                    self.hasError = true;
                    self.signup.password = '';
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
            var email = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
            if (this.signup.first_name.trim().length == 0) {
                this.hasError = true;
                this.errors.push('First name field is required.');
            }
            if (this.signup.last_name.trim().length == 0) {
                this.hasError = true;
                this.errors.push('Last name field is required.');
            }
            if (this.signup.email.trim().length == 0) {
                this.hasError = true;
                this.errors.push('Email field is required.');
            }
            if (this.signup.password.trim().length == 0) {
                this.hasError = true;
                this.errors.push('Password field is required.');
            }
            if (this.signup.email.trim().length > 0 && !email.test(this.signup.email)) {
                this.hasError = true;
                this.errors.push('Email format is not valid.');
            }
            if (this.hasError) {
                this.signup.password = '';
            }

        }
    }

}
