var mongooose = require('mongoose');
var textSearch=require('mongoose-text-search');
var Schema=mongooose.Schema;
var MenuSchema=new Schema({
    
    menu : String,
    price: Number,
    catagory: String,
    serving: Number,
    details: String
    // restaurant: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Restaurant'
    // }
//    restaurant: String
    
});
MenuSchema.plugin(textSearch);
MenuSchema.index({'$**':'text'});
module.exports=mongooose.model('Menu',MenuSchema);
