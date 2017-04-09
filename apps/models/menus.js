var mongooose = require('mongoose');
var Schema=mongooose.Schema;
var MenuSchema=new Schema({
    
    menu : String,
    price: Number,
    catagory: String,
    // restaurant: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Restaurant'
    // }
   restaurant: String
});

module.exports=mongooose.model('Menu',MenuSchema);
