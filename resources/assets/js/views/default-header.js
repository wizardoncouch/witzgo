/**
 * Created by lexus on 7/21/15.
 */
module.exports = {
    inherit: true,
    data: function(){
        return {
            withNav: true,
            logo: '/images/logo.png'
        }
    },
    template: require('./default-header.template.html'),
    ready: function () {
        if (this.view == 'signin' || this.view == 'signup') {
            this.withNav = false;
            this.logo = '/images/logo-title.png'
        }
    },
    methods: {
        logout: function () {
            var self = this;
            var token = Cookies.get('authorization');
            if (token) {
                $.ajax({
                    url: '/api/1.0/auth/logout',
                    method: 'GET',
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', 'Bearer ' + token)
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
}
