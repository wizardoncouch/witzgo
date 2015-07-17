/**
 *
 * Created by lexus on 7/18/15.
 */


module.exports = {
    props: {
        subView: String
    },
    template: require('./popular.template.html'),
    components: {
        'groups-view': {
            template: 'This is the view for the popular groups'
        },
        'itineraries-view': {
            template: 'This is the view for the popular itineraries'
        },
        'destinations-view': {
            template: 'This is the view for the popular destinations'
        }
    }

}
