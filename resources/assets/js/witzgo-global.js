/**
 * Created by lexus on 7/25/15.
 */


/****THIS IS USED FOR LOGIN WITH FACEBOOK IN LOGIN OR REGISTER PAGE*****/

var pathArray = window.location.pathname.split('/');
if (pathArray[1] == 'signup' || pathArray[1] == 'signin') {

    window.fbAsyncInit = function () {
        FB.init({
            appId: '1627355924200940',//'1627354400867759',
            oauth: true,
            cookie: true,  // enable cookies to allow the server to access
            xfbml: true,  // parse social plugins on this page
            status: true,  // check login status
            version: 'v2.4' // use version 2.2
        });
    };

    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
            return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

}


