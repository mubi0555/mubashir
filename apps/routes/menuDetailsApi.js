var express=require('express');
var DetailRouter=express.Router();
var fs=require('fs');
var path = require('path')
var multer = require('multer')
var Menu=require('../models/menus.js');
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});
var upload = multer({ storage : storage}).single('userPhoto');

DetailRouter.post('/addDetails/:id' , function(request,response){
    console.log(request.body);
Menu.findById({_id: request.params.id},function(err,data){
    data.typesofcuisine=request.body.typesofcuisine,
    data.quantity=request.body.quantity,
    data.serving=request.body.serving,
    data.glutinfree=request.body.glutinfree,
    data.typeofmenu=request.body.typeofmenu,
    data.other_details=request.body.other_details,
    
    data.save(function(err,data){
        if(err){
             response.status(400).json(err);
        }
        else{
            console.log(data);
          response.json(data);
        }
    });




});

});

DetailRouter.post('/addPhoto/:id',function(req,res){
   upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        console.log("File is uploaded");
    });
Menu.findById({_id:req.params.id},function(err,PhotoData){
    PhotoData.img.data=fs.readFileSync(Path);
    PhotoData.img.contentType='image/jpg';
})

});


DetailRouter.get('/searchMenu/:id',function(request,response){

    Menu.findById({_id: request.params.id},function(err,data){

if(err){
    response.status(400).json(err);
}
else{
    console.log(data);
    response.json(data);
}

    });
});

module.exports=DetailRouter;