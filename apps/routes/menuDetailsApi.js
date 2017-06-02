var express=require('express');
var DetailRouter=express.Router();
var Menu=require('../models/menus.js');
DetailRouter.post('/addDetails/:id',function(request,response){

Menu.findById({_id: request.params.id},function(err,data){

if(err){
    response.status(400).json(err);
}
else{
    data.catagory=request.body.catagory,
    data.quantity=request.body.quantity,
    data.serving=request.body.serving,
    data.glutinfree=request.body.glutinfree

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