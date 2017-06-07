var mongoose = require('mongoose');
var textSearch=require('mongoose-text-search');
var Schema=mongoose.Schema;
var MenuSchema=new Schema({
    
    menu : String,
    glutinfree:{
      type: String,
      enum: ['Yes','No']
    },
    typeofmenu: { type: Boolean, default: false },
    other_details:String,
    serving: String,
    quantity: String,
    price: Number,
    typesofcuisine: String,
    catagory: String,
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref : 'Restaurant'
    }
    
});
MenuSchema.plugin(textSearch);
MenuSchema.index({menu:'text', catagory:'text'});
module.exports=mongoose.model('Menu',MenuSchema);
