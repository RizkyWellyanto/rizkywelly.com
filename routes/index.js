/**
 * Created by rizky on 3/13/17.
 */

module.exports = function(app, router){
    app.use('/api', require('./home.js')(router));
};