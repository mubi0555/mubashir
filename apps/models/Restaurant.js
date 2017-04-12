var mongooose = require('mongoose');
var Schema=mongooose.Schema;
var RestaurantSchema=new Schema({

    name: String,
    address: {type: String, unique: true},
    phone: String,
    typeofcuisine: String,
    tags: String,
    hoursofoperation:[{
        day: String,
        open:  Date,
        close: Date
    }]
});

module.exports=mongooose.model('Restaurant',RestaurantSchema);
