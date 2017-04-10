var mongooose = require('mongoose');
var Schema=mongooose.Schema;
var RestaurantSchema=new Schema({

    name: String,
    address: {type: String, unique: true},
    phone: String,
    typeofcuisine: String,
    tags: String,
    // hoursofoperation: [{
    //     type: mongooose.Schema.Types.ObjectId,
    //     ref : 'HoursOfOperation'
    // }]

    hoursofoperation:[{
        day: String,
        open: new Date(),
        close: new Date()
    }]
});

module.exports=mongooose.model('Restaurant',RestaurantSchema);
