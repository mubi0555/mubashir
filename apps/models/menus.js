var mongoose = require('mongoose');
var textSearch=require('mongoose-text-search');
var Schema=mongoose.Schema;
var MenuSchema=new Schema({
    
    menu : String,
    glutenfree:{
      type: String,
      enum: ['Yes','No']
    },
    price: Number,
    catagory: String,
    serving: String,
    quantity: String,
    details: String,
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref : 'Restaurant'
    }
    
});
MenuSchema.plugin(textSearch);
MenuSchema.index({menu:'text', catagory:'text'});
module.exports=mongoose.model('Menu',MenuSchema);
