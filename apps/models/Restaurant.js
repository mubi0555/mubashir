var mongooose = require('mongoose');
var textSearch=require('mongoose-text-search');
var Schema=mongooose.Schema;
var RestaurantSchema=new Schema({

    restaurant: String,
    address: {type: String, unique: true},
    phone: String,
    timings: String,
    menu: [{
        type: mongooose.Schema.Types.ObjectId,
        ref: 'menu'
    }]
});
RestaurantSchema.plugin(textSearch);
RestaurantSchema.index({restaurant:'text'});
module.exports=mongooose.model('Restaurant',RestaurantSchema);
