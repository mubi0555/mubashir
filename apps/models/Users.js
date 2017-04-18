var mongoose= require('mongoose');
var bcrypt= require('bcrypt-nodejs');
var Schema=mongoose.Schema;
var UserSchema= new Schema({
    name: String,
    email :{type: String, index: {unique : true}},
    password: String

});

// UserSchema.methods.generateHash=function(password){
//     return bcrypt.hashSync(password,bcrypt.genSalt(9),null);
// }


module.exports=mongoose.model('Users',UserSchema);