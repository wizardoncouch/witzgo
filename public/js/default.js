(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

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
            logo: '/images/logo.png'
        };
    },
    template: require('./default-header.template.html'),
    ready: function ready() {
        if (this.view == 'signin' || this.view == 'signup') {
            this.withNav = false;
            this.logo = '/images/logo-title.png';
        }
    },
    methods: {
        logout: function logout() {
            var self = this;
            var token = Cookies.get('authorization');
            if (token) {
                $.ajax({
                    url: '/api/1.0/auth/logout',
                    method: 'GET',
                    beforeSend: function beforeSend(xhr) {
                        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
                    }
                }).done(function () {
                    self.isLogged = false;
                    self.user = {};
                    Cookies.expire('authorization');
                    window.location.href = '/';
                });
            }
        }
    }
};

},{"./default-header.template.html":5}],5:[function(require,module,exports){
module.exports = '<nav class="navbar navbar-default navbar-fixed-top">\n    <div class="container">\n        <div class="navbar-header text-center" v-class="no-float: !withNav">\n            <button type="button" v-if="withNav" v-on="click: toggle=true" class="navbar-toggle collapsed" data-toggle="collapse"\n                    data-target="#navbar"\n                    aria-expanded="false" aria-haspopup="true" aria-controls="navbar">\n                <span class="sr-only">Toggle navigation</span>\n                <span class="icon-bar"></span>\n                <span class="icon-bar"></span>\n                <span class="icon-bar"></span>\n            </button>\n            <a href="/wall" title="witzgo" class="hidden-xs visible-lg" v-class="margin-top-negative-ten: !withNav" v-class="navbar-brand: withNav">\n                <img class="margin-top-eight-zero" v-attr="src: logo" height="40px"/>\n            </a>\n            <a href="/wall" title="witzgo" class="hidden-lg visible-xs" class="margin-top-negative-ten">\n                <img class="margin-top-eight-zero" src="/images/logo-title.png" height="40px"/>\n            </a>\n        </div>\n        <div id="navbar" class="navbar-collapse collapse" v-if="withNav">\n            <div class="col-md-4 col-md-push-3">\n                <ul class="nav navbar-nav">\n                    <li>\n                        <div class="input-group margin-top-eight-zero">\n                            <span class="input-group-addon"><i class="fa fa-search"></i></span>\n                            <input type="text" class="form-control" id="search"\n                                   placeholder="Search in Groups, Destinations, etc...">\n                        </div>\n\n                    </li>\n\n                </ul>\n            </div>\n            <div class="col-md-3 col-md-pull-4">\n                <ul class="nav navbar-nav margin-top-five-zero">\n                    <li v-class="active: view == \'wall\'"><a href="/wall"><i class="fa fa-home"></i> &nbsp;\n                        Wall</a></li>\n                    <li v-class="active: view == \'browse\'" class="dropdown">\n                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"\n                           aria-expanded="false"><i class="fa fa-star"></i> &nbsp; Browse <span\n                                class="caret"></span></a>\n                        <ul class="dropdown-menu">\n                            <li v-class="active: sub == \'groups\'"><a href="/browse/groups"><i\n                                    class="fa fa-users"></i> &nbsp; Groups</a></li>\n                            <li v-class="active: sub == \'itineraries\'"><a href="/browse/itineraries"><i\n                                    class="fa fa-list-alt"></i> &nbsp; Itineraries</a></li>\n                            <li v-class="active: sub == \'destinations\'"><a href="/browse/destinations"><i\n                                    class="fa fa-globe"></i> &nbsp; Destinations</a>\n                            </li>\n                        </ul>\n                    </li>\n                </ul>\n\n            </div>\n\n            <div class="col-md-3">\n                <ul class="nav navbar-nav navbar-right margin-top-five-zero">\n                    <li><a href="/signin"><i class="fa fa-sign-in"></i> Sign\n                        In</a></li>\n                </ul>\n            </div>\n        </div>\n        <!--/.nav-collapse -->\n    </div>\n</nav>';
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
    template: require('./page-header.template.html'),
    ready: function ready() {
        var self = this;
        var token = Cookies.get('authorization');
        if (token) {
            $.ajax({
                url: '/api/1.0/auth/user',
                method: 'GET',
                data: { 'username': self.user.username },
                beforeSend: function beforeSend(xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + token);
                }
            }).done(function (result) {
                self.isLogged = true;
                self.user = result;
            });
        } else {
            self.isLogged = false;
            if (self.user.username) {
                $.ajax({
                    url: '/api/1.0/auth/user',
                    method: 'GET',
                    data: { 'username': self.user.username }
                }).done(function (result) {
                    self.user = result;
                });
            }
        }
    }
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
    data: function data() {
        return {
            signin: {
                email: null,
                password: null,
                remember: null
            },
            hasError: false,
            errors: []
        };
    },
    ready: function ready() {
        var token = Cookies.get('authorization');
        if (token) {
            window.location.href = '/';
        }
    },

    template: require('./signin.template.html')
};

},{"./signin.template.html":9}],9:[function(require,module,exports){
module.exports = '<!-- LOGIN FORM -->\n<!-- Main Form -->\n<div class="auth-form-wrapper">\n    <div class="auth-title"><i class="fa fa-sign-in"></i> Sign In</div>\n    <hr/>\n\n    <div class="row">\n\n\n        <div class="col-md-6 login-group text-left">\n\n            <div class="login-form-main-message"></div>\n            <div class="main-login-form">\n                <div class="input-group">\n                    <span class="input-group-addon"><i class="fa fa-user"></i></span>\n                    <input type="text" class="form-control" placeholder="email or username" required autofocus>\n                </div>\n                <div class="input-group">\n                    <span class="input-group-addon"><i class="fa fa-lock"></i></span>\n                    <input type="password" class="form-control" placeholder="password" required>\n                </div>\n                <div class="form-group login-group-checkbox">\n                    <input type="checkbox" id="remember" name="remember">\n                    <label for="remember"> &nbsp; remember</label>\n                </div>\n                <div class="margin-ten-zero">\n                    <button type="button" class="btn btn-block btn-social btn-success margin-five-zero">\n                        <i class="fa fa-sign-in"></i> Sign In\n                    </button>\n                </div>\n                <div class="etc-login-form">\n                    <p class="nowrap">forgot your account? <a href="/forgot-account">click here</a></p>\n\n                    <p class="nowrap">don\'t have an account? <a href="/signup">create new account</a></p>\n                </div>\n            </div>\n        </div>\n        <div class="col-md-6 login-group">\n            <p class="font-eighteen bold text-center">or</p>\n\n            <div>\n                <button type="button" class="btn btn-block btn-social btn-facebook">\n                    <i class="fa fa-facebook"></i> Sign in with Facebook\n                </button>\n            </div>\n            <div class="margin-fifty-zero">\n                <p>By clicking "Sign In with Facebok" I acknowlege and agree to the <a\n                        href="/terms">Terms of Use</a> and <a href="/privacy-policy">Privacy Policy</a>.\n                </p>\n            </div>\n        </div>\n    </div>\n</div>\n<!-- end:Main Form -->\n';
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
                first_name: null,
                last_name: null,
                email: null,
                password: null,
                gender: null
            },
            hasError: false,
            errors: []
        };
    },
    ready: function ready() {
        var token = Cookies.get('authorization');
        if (token) {
            window.location.href = '/';
        }
    },
    template: require('./signup.template.html'),
    methods: {
        post: function post() {
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
                    for (var i in response) {
                        self.errors.push(response[i]);
                    }
                });
            }
        },
        validate: function validate() {
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

};

},{"./signup.template.html":11}],11:[function(require,module,exports){
module.exports = '<div class="auth-form-wrapper">\n    <div class="auth-title"><i class="fa fa-pencil"></i> Sign Up</div>\n    <hr/>\n    <div class="row">\n\n        <div class="col-md-6 login-group text-left">\n\n            <div class="login-form-main-message"></div>\n            <div class="main-login-form">\n                <div class="input-group">\n                    <span class="input-group-addon"><i class="fa fa-user"></i></span>\n                    <input type="text" class="form-control" placeholder="first name" required autofocus>\n                </div>\n                <div class="input-group">\n                    <span class="input-group-addon"><i class="fa fa-user"></i></span>\n                    <input type="text" class="form-control" placeholder="last name" required>\n                </div>\n                <div class="input-group">\n                    <span class="input-group-addon"><i class="fa fa-envelope"></i></span>\n                    <input type="email" class="form-control" placeholder="email" required>\n                </div>\n                <div class="input-group">\n                    <span class="input-group-addon"><i class="fa fa-lock"></i></span>\n                    <input type="password" class="form-control" placeholder="password" required>\n                </div>\n                <div class="form-group login-group-checkbox">\n                    <input type="radio" class="" name="reg_gender" id="male" placeholder="username">\n                    <label for="male">male</label>\n                    <input type="radio" class="" name="reg_gender" id="female" placeholder="username">\n                    <label for="female">female</label>\n                </div>\n                <div class="margin-ten-zero">\n                    <button type="button" class="btn btn-block btn-social btn-success margin-five-zero">\n                        <i class="fa fa-pencil"></i> Sign Up\n                    </button>\n                </div>\n                <div class="etc-login-form">\n                    <p class="nowrap">already have an account? <a href="/signin">sign in</a></p>\n                </div>\n            </div>\n        </div>\n        <div class="col-md-6 login-group">\n\n            <p class="font-eighteen bold text-center">or</p>\n\n            <div>\n                <button type="button" class="btn btn-block btn-social btn-facebook">\n                    <i class="fa fa-facebook"></i> Sign in with Facebook\n                </button>\n            </div>\n            <div class="margin-fifty-zero">\n                <p>By clicking "Sign Up" or "Sign In with Facebok" I acknowlege and agree to the <a\n                        href="/terms">Terms of Use</a> and <a href="/privacy-policy">Privacy Policy</a>.\n                </p>\n            </div>\n        </div>\n    </div>\n</div>\n<!-- end:Main Form -->\n';
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
