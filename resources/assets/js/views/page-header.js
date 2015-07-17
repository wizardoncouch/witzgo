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
            template: '<a class="navbar-brand" href="#" style="font-family: Comfortaa, Lato, Tahoma, Verdana; font-size: 30px; font-weight:bold; text-shadow: 4px 4px 4px #aaa;">witz<span style="color:forestgreen;">go</span></a>'
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

