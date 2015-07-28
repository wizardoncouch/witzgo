(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

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

},{"./views/browse":2,"./views/page-header":6,"./views/signin":8,"./views/signup":10,"./views/wall":14}],2:[function(require,module,exports){
/**
 *
 * Created by lexus on 7/18/15.
 */

'use strict';

module.exports = {
    props: {
        sub: String
    },
    ready: function ready() {
        console.log(this.sub);
    },
    template: require('./browse.template.html'),
    components: {
        'groups': {
            template: 'do you want to subscribe ahead to our newsletters? <a href="/signup"> create account ahead.</a>'
        },
        'itineraries': {
            template: 'do you want to subscribe ahead to our newsletters? <a href="/signup"> create account ahead.</a>'
        },
        'destinations': {
            template: 'do you want to subscribe ahead to our newsletters? <a href="/signup"> create account ahead.</a>'
        }
    }

};

},{"./browse.template.html":3}],3:[function(require,module,exports){
module.exports = '<div class="text-center" style="padding:50px 0">\n    <div class="row auth-form-wrapper">\n        <div class="auth-title"><i class="fa fa-eye"></i> Coming soon.</div>\n        <hr/>\n        <component is="{{ sub }}"></component>\n    </div>\n</div>\n';
},{}],4:[function(require,module,exports){
/**
 * Created by lexus on 7/21/15.
 */
'use strict';

module.exports = {
    inherit: true,
    data: function data() {
        return {
            withNav: true,
            logo: '/images/logo-title.png',
            logged: false,
            logged_name: ''
        };
    },
    template: require('./default-header.template.html'),
    ready: function ready() {
        if (this.view == 'signin' || this.view == 'signup') {
            this.withNav = false;
        }
        if (sessionStorage.isLogged == 1) {
            var logged = JSON.parse(sessionStorage.logged);
            this.logged = true;
            this.logged_name = logged.first_name + ' ' + logged.last_name;
            this.logo = '/images/logo.png';
        }
    },
    methods: {
        signout: function signout() {
            $.ajax({
                url: '/api/1.0/auth/signout',
                method: 'GET',
                beforeSend: function beforeSend(xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + sessionStorage.token);
                }
            }).always(function () {
                sessionStorage.removeItem('authorization');
                sessionStorage.removeItem('logged');
                sessionStorage.isLogged = 0;
                //window.location.href = '/';
            });
        }
    }
};

},{"./default-header.template.html":5}],5:[function(require,module,exports){
module.exports = '<nav class="navbar navbar-default navbar-fixed-top">\n    <div class="container">\n        <div class="text-center" v-class="col-sm-2: withNav" v-class="col-sm-12: !withNav">\n            <div class="row">\n\n                <a href="/" title="witzgo">\n                    <img class="margin-top-eight-zero" src="/images/logo-title.png" height="40px"/>\n                </a>\n                <button type="button" v-if="withNav" class="navbar-toggle collapsed" data-toggle="collapse"\n                        data-target="#witzgo-links"\n                        aria-expanded="false" aria-haspopup="true">\n                    <span class="sr-only">Toggle navigation</span>\n                    <span class="icon-bar"></span>\n                    <span class="icon-bar"></span>\n                    <span class="icon-bar"></span>\n                </button>\n            </div>\n        </div>\n        <div class="col-sm-10" v-if="withNav">\n            <div id="witzgo-links" class="collapse navbar-collapse">\n                <ul class="nav navbar-nav">\n                    <li>\n                        <div class="visible-xs hidden-sm hidden-md hidden-lg margin-top-eight-zero">\n                            <div class="input-group margin-left-fifteen margin-right-fifteen">\n                                <span class="input-group-addon"><i class="fa fa-search"></i></span>\n                                <input type="text" class="form-control"\n                                       placeholder="Search in Groups, Destinations, etc...">\n                            </div>\n                        </div>\n                    </li>\n                    <li v-class="active: view == \'wall\'"><a href="/wall" class="nowrap"><i class="fa fa-home"></i> Wall</a>\n                    </li>\n                    <li v-class="active: view == \'browse\'" class="dropdown">\n                        <a href="#" class="dropdown-toggle nowrap" data-toggle="dropdown" role="button"\n                           aria-haspopup="true"\n                           aria-expanded="false"><i class="fa fa-star"></i> Browse<span class="caret"></span></a>\n                        <ul class="dropdown-menu">\n                            <li v-class="active: sub == \'groups\'"><a href="/browse/groups"><i\n                                    class="fa fa-users"></i> &nbsp; Groups</a></li>\n                            <li v-class="active: sub == \'itineraries\'"><a href="/browse/itineraries"><i\n                                    class="fa fa-list-alt"></i> &nbsp; Itineraries</a></li>\n                            <li v-class="active: sub == \'destinations\'"><a href="/browse/destinations"><i\n                                    class="fa fa-globe"></i> &nbsp; Destinations</a>\n                            </li>\n                        </ul>\n                    </li>\n                    <li>\n                        <div class="hidden-xs visible-sm visible-md visible-lg margin-top-eight-zero search">\n                            <div class="input-group margin-left-ten">\n                                <span class="input-group-addon"><i class="fa fa-search"></i></span>\n                                <input type="text" class="form-control"\n                                       placeholder="Search in Groups, Destinations, etc...">\n                            </div>\n                        </div>\n                    </li>\n                </ul>\n                <ul class="nav navbar-nav navbar-right">\n                    <li v-if="!logged"><a href="/signin" class="nowrap"><i class="fa fa-sign-in"></i> Sign In</a></li>\n                    <li v-if="logged" class="dropdown">\n                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"\n                           aria-expanded="false">{{ logged_name }}<span class="caret"></span></a>\n                        <ul class="dropdown-menu">\n                            <li><a href="#">Edit Profile</a></li>\n                            <li><a href="#">Create Itinerary</a></li>\n                            <li><a href="#">Post Destination</a></li>\n                            <li role="separator" class="divider"></li>\n                            <li><a href="#" v-on="click: signout"><i class="fa fa-sign-out"></i> Sign Out</a></li>\n                        </ul>\n                    </li>\n                </ul>\n            </div>\n        </div>\n    </div>\n</nav>\n';
},{}],6:[function(require,module,exports){
/**
 *
 * Created by lexus on 7/17/15.
 */

'use strict';

module.exports = {
    inherit: true,
    components: {
        'default': require('./default-header'),
        'user': require('./user-header')
    },
    template: require('./page-header.template.html')
};

},{"./default-header":4,"./page-header.template.html":7,"./user-header":12}],7:[function(require,module,exports){
module.exports = '<default></default>\n<user v-if="isUser"></user>';
},{}],8:[function(require,module,exports){
/**
 *
 * Created by lexus on 7/17/15.
 */

'use strict';

module.exports = {
    template: require('./signin.template.html'),
    data: function data() {
        return {
            signin: {
                user: '',
                password: '',
                remember: ''
            },
            hasError: false,
            errors: []
        };
    },
    ready: function ready() {
        if (sessionStorage.isLogged == 1) {
            window.location.href = '/';
        }
    },
    methods: {
        fbsignin: function fbsignin() {
            FB.login(function (response) {
                if (response.authResponse) {
                    FB.api('/me?fields=first_name,last_name,gender,email', function (response) {
                        var fb_data = {
                            'first_name': response.first_name,
                            'last_name': response.last_name,
                            'email': response.email,
                            'gender': response.gender,
                            'id': response.id
                        };
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
        submit: function submit() {
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
        validate: function validate() {
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

};

},{"./signin.template.html":9}],9:[function(require,module,exports){
module.exports = '<div id="fb-root"></div>\n<div class="auth-form-wrapper">\n    <div class="auth-title"><i class="fa fa-sign-in"></i> Sign In</div>\n    <hr/>\n\n    <div class="row">\n\n\n        <div class="col-md-6 login-group text-left">\n            <div class="main-login-form">\n                <ul class="alert alert-danger error" v-if="hasError">\n                    <li v-repeat="row: errors"><i class="fa fa-times"></i> &nbsp; {{ row }}</li>\n                </ul>\n                <div class="input-group">\n                    <span class="input-group-addon"><i class="fa fa-user"></i></span>\n                    <input type="text" class="form-control" placeholder="email or username" v-model="signin.user"\n                           v-on="keyup: submit| key 13" required autofocus>\n                </div>\n                <div class="input-group">\n                    <span class="input-group-addon"><i class="fa fa-lock"></i></span>\n                    <input type="password" class="form-control" placeholder="password" v-model="signin.password"\n                           v-on="keyup: submit | key 13" required>\n                </div>\n                <div class="form-group login-group-checkbox">\n                    <input type="checkbox" id="remember" name="remember">\n                    <label for="remember"> &nbsp; remember</label>\n                </div>\n                <div class="margin-ten-zero">\n                    <button type="button" class="btn btn-block btn-social btn-success margin-five-zero"\n                            v-on="click: submit">\n                        <i class="fa fa-sign-in"></i> Sign In\n                    </button>\n                </div>\n                <div class="etc-login-form">\n                    <p class="nowrap">forgot your account? <a href="/forgot-account">click here</a></p>\n\n                    <p class="nowrap">don\'t have an account? <a href="/signup">create new account</a></p>\n                </div>\n            </div>\n        </div>\n        <div class="col-md-6 login-group">\n            <p class="font-eighteen bold text-center">or</p>\n\n            <div>\n                <button type="button" class="btn btn-block btn-social btn-facebook" v-on="click:fbsignin">\n                    <i class="fa fa-facebook"></i> Sign in with Facebook\n                </button>\n            </div>\n            <div class="margin-fifty-zero">\n                <p>By clicking "Sign In with Facebok" I acknowlege and agree to the <a\n                        href="/terms">Terms of Use</a> and <a href="/privacy-policy">Privacy Policy</a>.\n                </p>\n            </div>\n        </div>\n    </div>\n</div>\n';
},{}],10:[function(require,module,exports){
/**
 *
 * Created by lexus on 7/17/15.
 */

'use strict';

module.exports = {
    data: function data() {
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
        };
    },
    ready: function ready() {
        if (sessionStorage.isLogged == 1) {
            window.location.href = '/';
        }
    },
    template: require('./signup.template.html'),
    methods: {
        fbsignin: function fbsignin() {
            FB.login(function (response) {
                console.log(response);
                if (response.authResponse) {
                    FB.api('/me?fields=first_name,last_name,gender,email', function (response) {
                        console.log(response);
                        var fb_data = {
                            'first_name': response.first_name,
                            'last_name': response.last_name,
                            'email': response.email,
                            'gender': response.gender,
                            'id': response.id
                        };
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
        submit: function submit() {
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
        validate: function validate() {
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

};

},{"./signup.template.html":11}],11:[function(require,module,exports){
module.exports = '<div id="fb-root"></div>\n<div class="auth-form-wrapper">\n    <div class="auth-title"><i class="fa fa-pencil"></i> Sign Up</div>\n    <hr/>\n\n    <ul class="alert alert-success" v-if="success">\n        <li><i class="fa fa-check"></i> &nbsp; Sign up successfull. Thank you for joining <a href="http://witzgo.com">witzgo.com</a>. Please check your email for the activation instructions.</li>\n    </ul>\n\n    <div class="row" v-if="!success">\n        <div class="col-md-6 login-group text-left">\n\n            <ul class="alert alert-danger" v-if="hasError">\n                <li v-repeat="row: errors"><i class="fa fa-times"></i> &nbsp; {{ row }}</li>\n            </ul>\n\n            <div class="main-login-form">\n                <div class="input-group">\n                    <span class="input-group-addon"><i class="fa fa-user"></i></span>\n                    <input type="text" class="form-control" placeholder="first name" v-model="signup.first_name"\n                           required autofocus>\n                </div>\n                <div class="input-group">\n                    <span class="input-group-addon"><i class="fa fa-user"></i></span>\n                    <input type="text" class="form-control" placeholder="last name" v-model="signup.last_name" required>\n                </div>\n                <div class="input-group">\n                    <span class="input-group-addon"><i class="fa fa-envelope"></i></span>\n                    <input type="email" class="form-control" placeholder="email" v-model="signup.email" required>\n                </div>\n                <div class="input-group">\n                    <span class="input-group-addon"><i class="fa fa-lock"></i></span>\n                    <input type="password" class="form-control" placeholder="password" v-model="signup.password"\n                           required>\n                </div>\n                <div class="form-group login-group-checkbox">\n                    <input type="radio" name="gender" value="m" v-model="signup.gender">\n                    <label for="male">male</label>\n                    <span>&nbsp;&nbsp;</span>\n                    <input type="radio" name="gender" value="f" v-model="signup.gender">\n                    <label for="female">female</label>\n                </div>\n                <div class="margin-ten-zero">\n                    <button type="button" class="btn btn-block btn-social btn-success margin-five-zero"\n                            v-on="click: submit">\n                        <i class="fa fa-pencil"></i> Sign Up\n                    </button>\n                </div>\n                <div class="etc-login-form">\n                    <p class="nowrap">already have an account? <a href="/signin">sign in</a></p>\n                </div>\n            </div>\n        </div>\n        <div class="col-md-6 login-group">\n\n            <p class="font-eighteen bold text-center">or</p>\n\n            <div>\n                <button type="button" class="btn btn-block btn-social btn-facebook" v-on="click:fbsignin">\n                    <i class="fa fa-facebook"></i> Sign in with Facebook\n                </button>\n            </div>\n            <div class="margin-fifty-zero">\n                <p>By clicking "Sign Up" or "Sign In with Facebok" I acknowlege and agree to the <a\n                        href="/terms">Terms of Use</a> and <a href="/privacy-policy">Privacy Policy</a>.\n                </p>\n            </div>\n        </div>\n    </div>\n</div>\n';
},{}],12:[function(require,module,exports){
/**
 * Created by lexus on 7/21/15.
 */

'use strict';

module.exports = {
  template: require('./user-header.template.html')
};

},{"./user-header.template.html":13}],13:[function(require,module,exports){
module.exports = '<div class="container">\n    THis is the uer profile header\n</div>';
},{}],14:[function(require,module,exports){
/**
 *
 * Created by lexus on 7/17/15.
 */

'use strict';

module.exports = {
  template: require('./wall.template.html')

};

},{"./wall.template.html":15}],15:[function(require,module,exports){
module.exports = '\n<div class="text-center" style="padding:50px 0">\n    <div class="row auth-form-wrapper">\n        <div class="auth-title"><i class="fa fa-eye"></i> Coming soon.</div>\n        <hr/>\n        <p>share or plan your adventures with others.</p>\n        <p>do you want to subscribe ahead to our newsletters? <a href="/signup"> create account ahead.</a></p>\n    </div>\n</div>\n';
},{}]},{},[1]);
