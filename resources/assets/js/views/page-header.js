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
    ready:function(){
        var self = this;
        $('.nav a').click(function(){
            if(!$(this).hasClass('dropdown-toggle') && self.toggle == true){
                $(".navbar-toggle").click();
                self.toggle = false;
            }
        });
    },

    data: function () {
        return {
            toggle: false
        }
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
        hideNavigation: function () {
            //alert(this.current_view);
        }
    }
}

