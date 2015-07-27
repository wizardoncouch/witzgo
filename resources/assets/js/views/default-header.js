/**
 * Created by lexus on 7/21/15.
 */
module.exports = {
    inherit: true,
    data: function () {
        return {
            withNav: true,
            logo: '/images/logo-title.png',
            logged: false,
            logged_name: '',
        }
    },
    template: require('./default-header.template.html'),
    ready: function () {
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
        signout: function () {
            $.ajax({
                url: '/api/1.0/auth/signout',
                method: 'GET',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Authorization", "Bearer " + sessionStorage.token);
                }
            }).always(function () {
                sessionStorage.removeItem('authorization');
                sessionStorage.removeItem('logged');
                sessionStorage.isLogged = 0;
                //window.location.href = '/';
            });
        }
    }
}
