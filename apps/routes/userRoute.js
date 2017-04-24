var express=require('express');
var jwt = require('jsonwebtoken');
var router=express.Router();
var Users=require('../models/Users.js');

router.post('/createUser',function(req,res){
  var U=new Users({
       name: req.body.name,
      email:req.body.email,
      password:req.body.password
  });
    U.save(function(error,data){
        if(error){
            res.status(400).json();
        }
        else{
            console.log('User Created');
            res.json(data);
        }
    })
});

var secret='bornProgrammer';
router.post('/loginAuthentication',function(req,res){

Users.findOne({
    email: req.body.email
},
function(err,user){
    if(err) res.status(400).json(err);
    if(!user){
        res.json({success: false, message : 'User is not found'});
    }
    else if(user){
        if(user.password!= req.body.password){
        res.json({
            success: false, message: 'Password is incorrect'
        });
    }
    }
    
    else{
         var token = jwt.sign(user,secret,{
             expiresInMinutes: 1440
         });

         res.json({
             success: true,
             message: 'Token is assigned',
             token: token
         })

    }
}
);
   


});
module.exports=router;