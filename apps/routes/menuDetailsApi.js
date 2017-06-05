var express=require('express');
var DetailRouter=express.Router();
var Menu=require('../models/menus.js');
DetailRouter.post('/addDetails/:id',function(request,response){

Menu.findById({_id: request.params.id},function(err,data){

if(err){
    response.status(400).json(err);
}
else{
    data.typesofcuisine=request.body.typesofcuisine,
    data.quantity=request.body.quantity,
    data.serving=request.body.serving,
    data.glutinfree=request.body.glutinfree,
    data.typeofmenu=request.body.typeofmenu,
    data.other_details=request.body.other_details

    data.save(function(err,data){
        if(err){
             response.status(400).json(err);
        }
        else{
            console.log(data);
          response.json(data);
        }
    });
}

});

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