!function e(n,a,s){function i(r,o){if(!a[r]){if(!n[r]){var l="function"==typeof require&&require;if(!o&&l)return l(r,!0);if(t)return t(r,!0);var c=new Error("Cannot find module '"+r+"'");throw c.code="MODULE_NOT_FOUND",c}var d=a[r]={exports:{}};n[r][0].call(d.exports,function(e){var a=n[r][1][e];return i(a?a:e)},d,d.exports,e,n,a,s)}return a[r].exports}for(var t="function"==typeof require&&require,r=0;r<s.length;r++)i(s[r]);return i}({1:[function(e,n,a){"use strict";new Vue({el:"body",data:{view:"wall",sub:""},components:{"page-header":e("./views/page-header"),signin:e("./views/signin"),signup:e("./views/signup"),wall:e("./views/wall"),browse:e("./views/browse"),"page-footer":{props:["date"],template:'<p class="text-center font-twelve">&copy; {{date}} All Rights Reserved. <br> by: <a href="http://wizardoncouch.com" target="_blank">wizardoncouch</a></p>'}}})},{"./views/browse":2,"./views/page-header":6,"./views/signin":8,"./views/signup":10,"./views/wall":14}],2:[function(e,n,a){"use strict";n.exports={props:{sub:String},ready:function(){console.log(this.sub)},template:e("./browse.template.html"),components:{groups:{template:'do you want to subscribe ahead to our newsletters? <a href="/signup"> create account ahead.</a>'},itineraries:{template:'do you want to subscribe ahead to our newsletters? <a href="/signup"> create account ahead.</a>'},destinations:{template:'do you want to subscribe ahead to our newsletters? <a href="/signup"> create account ahead.</a>'}}}},{"./browse.template.html":3}],3:[function(e,n,a){n.exports='<div class="text-center" style="padding:50px 0">\n    <div class="row auth-form-wrapper">\n        <div class="auth-title"><i class="fa fa-eye"></i> Coming soon.</div>\n        <hr/>\n        <component is="{{ sub }}"></component>\n    </div>\n</div>\n'},{}],4:[function(e,n,a){"use strict";n.exports={inherit:!0,data:function(){return{withNav:!0,logo:"/images/logo-title.png",logged:!1,logged_name:""}},template:e("./default-header.template.html"),ready:function(){if(("signin"==this.view||"signup"==this.view)&&(this.withNav=!1),1==sessionStorage.isLogged){var e=JSON.parse(sessionStorage.logged);this.logged=!0,this.logged_name=e.first_name+" "+e.last_name,this.logo="/images/logo.png"}},methods:{signout:function(){$.ajax({url:"/api/1.0/auth/signout",method:"GET",beforeSend:function(e){e.setRequestHeader("Authorization","Bearer "+sessionStorage.token)}}).always(function(){sessionStorage.removeItem("authorization"),sessionStorage.removeItem("logged"),sessionStorage.isLogged=0})}}}},{"./default-header.template.html":5}],5:[function(e,n,a){n.exports='<nav class="navbar navbar-inverse navbar-fixed-top">\n    <div class="container">\n        <div class="text-center" v-class="col-sm-2: withNav" v-class="col-sm-12: !withNav">\n            <div class="row">\n\n                <a href="/" title="witzgo">\n                    <img class="margin-top-eight-zero" src="/images/logo-title.png" height="40px"/>\n                </a>\n                <a href="#" v-if="withNav" class="navbar-toggle collapsed" data-toggle="collapse"\n                        data-target="#witzgo-links"\n                        aria-expanded="false" aria-haspopup="true">\n                    <span class="sr-only">Toggle navigation</span>\n                    <i class="fa fa-align-right"></i>\n                </a>\n            </div>\n        </div>\n        <div class="col-sm-10" v-if="withNav">\n            <div id="witzgo-links" class="collapse navbar-collapse">\n                <ul class="nav navbar-nav">\n                    <li>\n                        <div class="visible-xs hidden-sm hidden-md hidden-lg margin-top-eight-zero">\n                            <div class="search-box">\n                                <input type="search" class="form-control search-control" placeholder="Search" />\n                                <i class="fa fa-search search-icon"></i>\n                            </div>\n                        </div>\n                    </li>\n                    <li v-class="active: view == \'wall\'"><a href="/wall" class="nowrap"><i class="fa fa-home"></i> Wall</a>\n                    </li>\n                    <li v-class="active: view == \'browse\'" class="dropdown">\n                        <a href="#" class="dropdown-toggle nowrap" data-toggle="dropdown" role="button"\n                           aria-haspopup="true"\n                           aria-expanded="false"><i class="fa fa-star"></i> Browse<span class="caret"></span></a>\n                        <ul class="dropdown-menu">\n                            <li v-class="active: sub == \'groups\'"><a href="/browse/groups"><i\n                                    class="fa fa-users"></i> &nbsp; Groups</a></li>\n                            <li v-class="active: sub == \'itineraries\'"><a href="/browse/itineraries"><i\n                                    class="fa fa-list-alt"></i> &nbsp; Itineraries</a></li>\n                            <li v-class="active: sub == \'destinations\'"><a href="/browse/destinations"><i\n                                    class="fa fa-globe"></i> &nbsp; Destinations</a>\n                            </li>\n                        </ul>\n                    </li>\n                    <li>\n                        <div class="hidden-xs visible-sm visible-md visible-lg margin-top-eight-zero search">\n                            <div class="search-box">\n                                <input type="search" class="form-control search-control" placeholder="Search" />\n                                <i class="fa fa-search search-icon"></i>\n                            </div>\n                        </div>\n                    </li>\n                </ul>\n                <ul class="nav navbar-nav navbar-right">\n                    <li v-if="!logged"><a href="/signin" class="nowrap"><i class="fa fa-sign-in"></i> Sign In</a></li>\n                    <li v-if="logged" class="dropdown">\n                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"\n                           aria-expanded="false">{{ logged_name }}<span class="caret"></span></a>\n                        <ul class="dropdown-menu">\n                            <li><a href="#">Edit Profile</a></li>\n                            <li><a href="#">Create Itinerary</a></li>\n                            <li><a href="#">Post Destination</a></li>\n                            <li role="separator" class="divider"></li>\n                            <li><a href="#" v-on="click: signout"><i class="fa fa-sign-out"></i> Sign Out</a></li>\n                        </ul>\n                    </li>\n                </ul>\n            </div>\n        </div>\n    </div>\n</nav>\n'},{}],6:[function(e,n,a){"use strict";n.exports={inherit:!0,components:{"default":e("./default-header"),user:e("./user-header")},template:e("./page-header.template.html")}},{"./default-header":4,"./page-header.template.html":7,"./user-header":12}],7:[function(e,n,a){n.exports='<default></default>\n<user v-if="isUser"></user>'},{}],8:[function(e,n,a){"use strict";n.exports={template:e("./signin.template.html"),data:function(){return{signin:{user:"",password:"",remember:""},hasError:!1,errors:[]}},ready:function(){1==sessionStorage.isLogged&&(window.location.href="/")},methods:{fbsignin:function(){FB.login(function(e){e.authResponse&&FB.api("/me?fields=first_name,last_name,gender,email",function(e){FB.api("/me/picture?type=large",function(n){switch(e.gender){case"male":var a="m";break;case"female":var a="f";break;default:var a="o"}var s={first_name:e.first_name,last_name:e.last_name,email:e.email,gender:a,id:e.id,url:n.data.url};$.ajax({url:"/api/1.0/auth/fbsignin",method:"POST",data:s}).done(function(e){sessionStorage.token=e.token,sessionStorage.isLogged=1,sessionStorage.logged=JSON.stringify(e),window.location.href="/user/"+e.username})})})},{scope:"email"})},submit:function(){if(this.validate(),this.hasError===!1){var e=this;$.ajax({url:"/api/1.0/auth/signin",method:"POST",data:e.signin}).done(function(e){sessionStorage.token=e.token,sessionStorage.isLogged=1,sessionStorage.logged=JSON.stringify(e),window.location.href="/user/"+e.username}).fail(function(n){e.hasError=!0,e.signin.password="";var a=n.responseJSON;for(var s in a)e.errors.push(a[s])})}},validate:function(){this.errors=[],this.hasError=!1,0==this.signin.user.trim().length&&(this.hasError=!0,this.errors.push("email or username field is required.")),0==this.signin.password.trim().length&&(this.hasError=!0,this.errors.push("password field is required.")),this.hasError&&(this.signin.password="")}}}},{"./signin.template.html":9}],9:[function(e,n,a){n.exports='<div id="fb-root"></div>\n<div class="auth-form-wrapper">\n    <div class="auth-title"><i class="fa fa-sign-in"></i> Sign In</div>\n    <hr/>\n\n    <div class="row">\n\n\n        <div class="col-md-6 login-group text-left">\n            <div class="main-login-form">\n                <ul class="alert alert-danger error" v-if="hasError">\n                    <li v-repeat="row: errors"><i class="fa fa-times"></i> &nbsp; {{ row }}</li>\n                </ul>\n                <div class="input-group">\n                    <span class="input-group-addon"><i class="fa fa-user"></i></span>\n                    <input type="text" class="form-control" placeholder="email or username" v-model="signin.user"\n                           v-on="keyup: submit| key 13" required autofocus>\n                </div>\n                <div class="input-group">\n                    <span class="input-group-addon"><i class="fa fa-lock"></i></span>\n                    <input type="password" class="form-control" placeholder="password" v-model="signin.password"\n                           v-on="keyup: submit | key 13" required>\n                </div>\n                <div class="form-group login-group-checkbox">\n                    <input type="checkbox" id="remember" name="remember">\n                    <label for="remember"> &nbsp; remember</label>\n                </div>\n                <div class="margin-ten-zero">\n                    <button type="button" class="btn btn-block btn-social btn-success margin-five-zero"\n                            v-on="click: submit">\n                        <i class="fa fa-sign-in"></i> Sign In\n                    </button>\n                </div>\n                <div class="etc-login-form">\n                    <p class="nowrap">forgot your account? <a href="/forgot-account">click here</a></p>\n\n                    <p class="nowrap">don\'t have an account? <a href="/signup">create new account</a></p>\n                </div>\n            </div>\n        </div>\n        <div class="col-md-6 login-group">\n            <p class="font-eighteen bold text-center">or</p>\n\n            <div>\n                <button type="button" class="btn btn-block btn-social btn-facebook" v-on="click:fbsignin">\n                    <i class="fa fa-facebook"></i> Sign in with Facebook\n                </button>\n            </div>\n            <div class="margin-fifty-zero">\n                <p>By clicking "Sign In with Facebok" I acknowlege and agree to the <a\n                        href="/terms">Terms of Use</a> and <a href="/privacy-policy">Privacy Policy</a>.\n                </p>\n            </div>\n        </div>\n    </div>\n</div>\n'},{}],10:[function(e,n,a){"use strict";n.exports={data:function(){return{signup:{first_name:"",last_name:"",email:"",password:"",gender:""},hasError:!1,success:!1,errors:[]}},ready:function(){1==sessionStorage.isLogged&&(window.location.href="/")},template:e("./signup.template.html"),methods:{fbsignin:function(){FB.login(function(e){e.authResponse&&FB.api("/me?fields=first_name,last_name,gender,email",function(e){FB.api("/me/picture?type=large",function(n){switch(e.gender){case"male":var a="m";break;case"female":var a="f";break;default:var a="o"}var s={first_name:e.first_name,last_name:e.last_name,email:e.email,gender:a,id:e.id,url:n.data.url};$.ajax({url:"/api/1.0/auth/fbsignin",method:"POST",data:s}).done(function(e){sessionStorage.token=e.token,sessionStorage.isLogged=1,sessionStorage.logged=JSON.stringify(e),window.location.href="/user/"+e.username})})})},{scope:"email"})},submit:function(){if(this.validate(),this.hasError===!1){var e=this;$.ajax({url:"/api/1.0/auth/signup",method:"POST",data:e.signup}).done(function(){e.success=!0,e.signup={first_name:"",last_name:"",email:"",password:"",gender:"m"}}).fail(function(n){e.hasError=!0,e.signup.password="";var a=n.responseJSON;for(var s in a)e.errors.push(a[s])})}},validate:function(){this.errors=[],this.hasError=!1;var e=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;0==this.signup.first_name.trim().length&&(this.hasError=!0,this.errors.push("First name field is required.")),0==this.signup.last_name.trim().length&&(this.hasError=!0,this.errors.push("Last name field is required.")),0==this.signup.email.trim().length&&(this.hasError=!0,this.errors.push("Email field is required.")),0==this.signup.password.trim().length&&(this.hasError=!0,this.errors.push("Password field is required.")),this.signup.email.trim().length>0&&!e.test(this.signup.email)&&(this.hasError=!0,this.errors.push("Email format is not valid.")),this.hasError&&(this.signup.password="")}}}},{"./signup.template.html":11}],11:[function(e,n,a){n.exports='<div id="fb-root"></div>\n<div class="auth-form-wrapper">\n    <div class="auth-title"><i class="fa fa-pencil"></i> Sign Up</div>\n    <hr/>\n\n    <ul class="alert alert-success" v-if="success">\n        <li><i class="fa fa-check"></i> &nbsp; Sign up successfull. Thank you for joining <a href="http://witzgo.com">witzgo.com</a>. Please check your email for the activation instructions.</li>\n    </ul>\n\n    <div class="row" v-if="!success">\n        <div class="col-md-6 login-group text-left">\n\n            <ul class="alert alert-danger" v-if="hasError">\n                <li v-repeat="row: errors"><i class="fa fa-times"></i> &nbsp; {{ row }}</li>\n            </ul>\n\n            <div class="main-login-form">\n                <div class="input-group">\n                    <span class="input-group-addon"><i class="fa fa-user"></i></span>\n                    <input type="text" class="form-control" placeholder="first name" v-model="signup.first_name"\n                           required autofocus>\n                </div>\n                <div class="input-group">\n                    <span class="input-group-addon"><i class="fa fa-user"></i></span>\n                    <input type="text" class="form-control" placeholder="last name" v-model="signup.last_name" required>\n                </div>\n                <div class="input-group">\n                    <span class="input-group-addon"><i class="fa fa-envelope"></i></span>\n                    <input type="email" class="form-control" placeholder="email" v-model="signup.email" required>\n                </div>\n                <div class="input-group">\n                    <span class="input-group-addon"><i class="fa fa-lock"></i></span>\n                    <input type="password" class="form-control" placeholder="password" v-model="signup.password"\n                           required>\n                </div>\n                <div class="form-group login-group-checkbox">\n                    <input type="radio" name="gender" value="m" v-model="signup.gender">\n                    <label for="male">male</label>\n                    <span>&nbsp;&nbsp;</span>\n                    <input type="radio" name="gender" value="f" v-model="signup.gender">\n                    <label for="female">female</label>\n                </div>\n                <div class="margin-ten-zero">\n                    <button type="button" class="btn btn-block btn-social btn-success margin-five-zero"\n                            v-on="click: submit">\n                        <i class="fa fa-pencil"></i> Sign Up\n                    </button>\n                </div>\n                <div class="etc-login-form">\n                    <p class="nowrap">already have an account? <a href="/signin">sign in</a></p>\n                </div>\n            </div>\n        </div>\n        <div class="col-md-6 login-group">\n\n            <p class="font-eighteen bold text-center">or</p>\n\n            <div>\n                <button type="button" class="btn btn-block btn-social btn-facebook" v-on="click:fbsignin">\n                    <i class="fa fa-facebook"></i> Sign in with Facebook\n                </button>\n            </div>\n            <div class="margin-fifty-zero">\n                <p>By clicking "Sign Up" or "Sign In with Facebok" I acknowlege and agree to the <a\n                        href="/terms">Terms of Use</a> and <a href="/privacy-policy">Privacy Policy</a>.\n                </p>\n            </div>\n        </div>\n    </div>\n</div>\n'},{}],12:[function(e,n,a){"use strict";n.exports={template:e("./user-header.template.html")}},{"./user-header.template.html":13}],13:[function(e,n,a){n.exports='<div class="container">\n    THis is the uer profile header\n</div>'},{}],14:[function(e,n,a){"use strict";n.exports={template:e("./wall.template.html")}},{"./wall.template.html":15}],15:[function(e,n,a){n.exports='\n<div class="text-center" style="padding:50px 0">\n    <div class="row auth-form-wrapper">\n        <div class="auth-title"><i class="fa fa-eye"></i> Coming soon.</div>\n        <hr/>\n        <p>share or plan your adventures with others.</p>\n        <p>do you want to subscribe ahead to our newsletters? <a href="/signup"> create account ahead.</a></p>\n    </div>\n</div>\n'},{}]},{},[1]);