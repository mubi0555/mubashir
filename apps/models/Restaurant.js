var mongooose = require('mongoose');
var textSearch=require('mongoose-text-search');
var Schema=mongooose.Schema;
var RestaurantSchema=new Schema({

    restaurant: String,
    address: {type: String, unique: true},
    phone: Number,
    timings: 
      {
    monday: String,
    tuesday:String,
    wednesday:String,
    thursday: String,
    friday: String,
    saturday: String,
    sunday: String
      }
         
});
RestaurantSchema.plugin(textSearch);
RestaurantSchema.index({restaurant:'text'});
module.exports=mongooose.model('Restaurant',RestaurantSchema);
