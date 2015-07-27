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
    template: require('./page-header.template.html')
}

