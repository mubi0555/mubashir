var express=require('express');
var MenuRouter=express.Router();
var Menu=require('../models/menus.js');
MenuRouter.get('/findmenu',function(req,res){
     Menu.find(function(err,data){
         if(err){
             res.status(400).json(err);
         }
         res.json(data);
     });
});

MenuRouter.post('/addmenu',function(req,res){
       console.log(req.body);
  var M=new Menu({
      menu: req.body.menu,
      price:req.body.price,
      catagory: req.body.catagory,
    //  restaurant: req.body.restaurant
    });


  M.save(function(err,data){
      if(err){
          res.status(400).json(err);
      }
      else{
          
          res.json(data);
      }
      
  });
});



MenuRouter.put('/updatemenu',function(req,res){

      Menu.findById(req.body._id,function(err,data){
           if(err){
               res.status(400).json(err);
           }
           else{
               data.menu=req.body.menu;
               data.price=req.body.price;
               data.catagory=req.body.catagory;
               data.restaurant=req.body.restaurant;
                     data.save(function(err,updatedData){
      if(err){
          res.status(400).json(err);

      }
      else{
          console.log(data);
          res.json(updatedData);
      }
  });
           }

      });
     

});

MenuRouter.get('/searchmenu/:id',function(req,res){
    Menu.findById(req.params.id,function(err,data){
         if(err){
             res.status(400).json(err);
         }
         res.json(data);
         console.log('Searched');
     });
});
MenuRouter.delete('/deletemenu/:id',function(req,res){

Menu.remove({_id: req.params.id},function(err,data){
   if(err){
       res.status(404).json(err);
   }
   else{
       res.send("Data has been deleted");
   }
});
});


module.exports=MenuRouter;