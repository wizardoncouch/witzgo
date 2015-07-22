/**
 *
 * Created by lexus on 7/18/15.
 */


module.exports = {
    props: {
        sub: String
    },
    ready: function () {
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

}
