/**
 *
 * Created by lexus on 7/17/15.
 */

module.exports = {
    inherit: true,
    components: {
        'default': require('./default-header'),
        'user': require('./user-header')
    },
    template: require('./page-header.template.html'),
    ready: function () {
        var self = this;
        var token = Cookies.get('authorization');
        if (token) {
            $.ajax({
                url: '/api/1.0/auth/user',
                method: 'GET',
                data: {'username': self.user.username},
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + token)
                }
            }).done(function (result) {
                self.isLogged = true;
                self.user = result;
            });
        }
        else {
            self.isLogged = false;
            if (self.user.username) {
                $.ajax({
                    url: '/api/1.0/auth/user',
                    method: 'GET',
                    data: {'username': self.user.username}
                }).done(function (result) {
                    self.user = result;
                });
            }
        }
    }
}

