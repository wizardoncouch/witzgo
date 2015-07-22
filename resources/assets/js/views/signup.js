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
                    url: '/api/1.0/auth/signup',
                    method: 'POST',
                    data: self.signup
                }).done(function (result) {
                    window.location.href = '/' + result.username;
                }).fail(function (xhr) {
                    self.hasError = true;
                    var response = xhr.responseJSON;
                    for(var i in response){
                        self.errors.push(response[i]);
                    }
                });
            }

        },
        validate:function(){
            this.errors = [];
            this.hasError = false;
            var pattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
            if (this.signup.first_name.trim().length == 0) {
                this.hasError = true;
                this.errors.push('first name field is required.');
            }
            if (this.signup.last_name.trim().length == 0) {
                this.hasError = true;
                this.errors.push('last name field is required.');
            }
            if (this.signup.email.trim().length == 0) {
                this.hasError = true;
                this.errors.push('email field is required.');
            }
            if (this.signup.password.trim().length == 0) {
                this.hasError = true;
                this.errors.push('password field is required.');
            }

        }
    }

}
