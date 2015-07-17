/**
 *
 * Created by lexus on 7/17/15.
 */

module.exports = {
    props: {
        logged: Boolean,
        authorization: String,
        view: String,
        subView: String
    },
    ready: function () {
        console.log(this.subView);
    },
    components: {
        'logo': {
            template: require('./logo.template.html')
        }
    },
    template: require('./page-header.template.html'),
    methods: {
        isLoggedIn: function () {
            return false;
        },
        isActive: function (view) {
            console.log(this.view);
            return this.view == view ? 'active' : '';
        },
        hideNavigation: function () {
            //alert(this.current_view);
        }
    }
}

