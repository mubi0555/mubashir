var mongoose = require('mongoose');
var textSearch=require('mongoose-text-search');
var Schema=mongoose.Schema;
var MenuSchema=new Schema({
    
    menu : String,
    price: Number,
    catagory: String,
    serving: Number,
    details: String,
    restaurant: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant'
    }]
    
});
MenuSchema.plugin(textSearch);
MenuSchema.index({menu:'text', catagory:'text'});
module.exports=mongoose.model('Menu',MenuSchema);
