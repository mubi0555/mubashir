var express=require('express');
var RestaurantRouter=express.Router();

var Restaurant=require('../models/Restaurant.js');

RestaurantRouter.post('/createRestaurant',function(req,res){

var R=new Restaurant({

    restaurant: req.body.restaurant,
    address: req.body.address,
    phone: parseInt(req.body.phone),
    opentime:req.body.opentime,
    closetime:req.body.closetime,
    opentimezone: req.body.opentimezone,
    closetimezone:req.body.closetimezone
});
    R.save(function(error,data){
        
        if(error){
            res.status(400).json();
            console.log(data);
        }
        else{
             console.log(data);
            res.json(data);
        }
    });
});

RestaurantRouter.get('/findRestaurant',function(req,res){
     Restaurant.find(function(error,data){
         if(error){
             res.status(400).json(error);
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
         console.log(data);
         console.log('Searched');
     });


});
RestaurantRouter.get('/SearchRestaurant/:id',function(req,res){
 Restaurant.findById(req.body._id,function(err,data){
         if(err){
             res.status(400).json(err);
         }
         res.json(data);
         console.log(data);
         console.log('Searched');
     });


});


RestaurantRouter.put('/updaterestaurant',function(req,res){

      Restaurant.findById(req.body._id,function(err,data){
           if(err){
               res.status(400).json(err);
           }
           
           else{
               
               data.restaurant=req.body.restaurant;
               data.address=req.body.address;
               data.phone=parseInt(req.body.phone);
               data.opentime=req.body.opentime;
               data.closetime=req.body.closetime;
               data.opentimezone=req.body.opentimezone;
               data.closetimezone=req.body.closetimezone
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
RestaurantRouter.get('/searchRestaurant:id',function(req,res){
    Restaurant.findById(req.params.id,function(err,data){
        if(err){
            res.status(400).json();
        }
        res.json(data);
    })
});

RestaurantRouter.delete('/deleteRestaurants/:id',function(req,res){
 Restaurant.remove({_id: req.params.id},function(err,data){
     if(err){
         res.status(400).json();
     }
     else{
         console.log("Restaurant deleted");
     }
 });
});

module.exports=RestaurantRouter;