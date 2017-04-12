var express=require('express');
// var app=express();
var RestaurantRouter=express.Router();

var Restaurant=require('../models/Restaurant.js');

RestaurantRouter.post('/createRestaurant',function(req,res){

var R=new Restaurant({

    name: req.body.Restaurantname,
    address: req.body.address,
    phone: req.body.phone,
    typeofcuisine: req.body.cuisine,
    tags: req.body.tags,
    hoursofoperation: req.body.hoursofoperation
});



    R.save(function(error,data){


        if(error){
            res.status(400).json();
        }
        else{
             console.log("Restaurant Created");
            res.json(data);
           
        }
    })


});

RestaurantRouter.get('/findRestaurant',function(req,res){
     Restaurant.find(function(error,data){
         if(error){
             res.status(400).json(err);
         }
         res.json(data);
     });
});

RestaurantRouter.get('/searchRestaurant/:id',function(req,res){
 Restaurant.findById(req.params.id,function(err,data){
         if(err){
             res.status(400).json(err);
         }
         res.json(data);
         console.log('Searched');
     });


});

RestaurantRouter.put('/updateRestaurant',function(req,res){

      Restaurant.findById(req.body._id,function(err,data){
           if(err){
               res.status(400).json(err);
           }
           else{
               data.name=req.body.Restaurantname;
               data.address=req.body.address;
               data.phone=req.body.phone;
               data.typeofcuisine=req.body.cuisine;
               data.tags=req.body.tags;
               data.hoursofoperation=req.body.hoursofoperation;
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



module.exports=RestaurantRouter;