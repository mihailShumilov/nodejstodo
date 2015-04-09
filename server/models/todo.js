/**
 * Created by godson on 4/9/15.
 */
var mongoose = require('mongoose');


module.exports = mongoose.model('Todo', {
    userid: String,
    text : String
});