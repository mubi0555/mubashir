var mongooose = require('mongoose');
var Schema=mongooose.Schema;
//var bcrypt= require('bcrypt-nodejs');

var MenuSchema=new Schema({

    menu : String,
    price: Number,
    catagory: String
});
module.exports=mongooose.model('Menu',MenuSchema);
