/**
 *
 * Created by lexus on 7/17/15.
 */


module.exports = {
    data: function () {
        return {
            signup: {
                first_name: null,
                last_name: null,
                email: null,
                password: null,
                gender: null
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
    template: require('./signup.template.html'),
    methods:{
        post:function(){
            this.validate();
            if (this.hasError === false) {
                var self = this;
                $.ajax({
                    url: '/api/1.0/auth/register',
                    method: 'POST',
                    data: self.register
                }).done(function (result) {
                    self.success = true;
                    self.register = {
                        first_name: '',
                        last_name: '',
                        email: '',
                        password: ''
                    };
                    self.response = 'Please check your email. We send you an activation link.';
                }).fail(function (xhr) {
                    self.hasError = true;
                    self.register.password = '';
                    var response = xhr.responseJSON;
                    for (var i in response) {
                        self.errors.push(response[i]);
                    }
                });
            }
        },
        validate:function(){
            this.errors = [];
            this.hasError = false;
            var email = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
            if (this.register.first_name.trim().length == 0) {
                this.hasError = true;
                this.errors.push('First name field is required.');
            }
            if (this.register.last_name.trim().length == 0) {
                this.hasError = true;
                this.errors.push('Last name field is required.');
            }
            if (this.register.email.trim().length == 0) {
                this.hasError = true;
                this.errors.push('Email field is required.');
            }
            if (this.register.password.trim().length == 0) {
                this.hasError = true;
                this.errors.push('Password field is required.');
            }
            if (this.register.email.trim().length > 0 && !email.test(this.register.email)) {
                this.hasError = true;
                this.errors.push('Email format is not valid.');
            }
            if (this.hasError) {
                this.register.password = '';
            }

        }
    }

}
