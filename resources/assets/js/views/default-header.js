/**
 * Created by lexus on 7/21/15.
 */
module.exports = {
    inherit: true,
    data: function () {
        return {
            withNav: true,
            logo: '/images/logo-title.png'
        }
    },
    template: require('./default-header.template.html'),
    ready: function () {
        if (this.view == 'signin' || this.view == 'signup') {
            this.withNav = false;
        }
        if (sessionStorage.isLogged == 1) {
            this.logo = '/images/logo.png'
        }
    }
}
