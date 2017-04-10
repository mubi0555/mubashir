var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose =  require('mongoose');
var morgan = require('morgan'); 
var port = process.env.PORT || 3000;
mongoose.connect('mongodb://localhost:27017/RestaurantDB');
//app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true})
);
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
app.use(function(request,response,next){
  response.setHeader('Access-Control-Allow-Origin','*');
  response.setHeader('Access-Control-Allow-Method','GET','POST');
  response.setHeader('Access-Control-Allow-Headers','X-Requested-With,content-type,\Authorization');
  next();
});
app.use(morgan('dev'));
var Menu=require('./apps/models/menus.js');
var Restaurant=require('./apps/models/Restaurant.js');
app.get('/',function(req,res){
    res.sendFile(__dirname+"/public/views/pages/index.html");
})

var apiRouter = express.Router();

apiRouter.get('/findmenu',function(req,res){
     Menu.find(function(err,data){
         if(err){
             res.status(400).json(err);
         }
         res.json(data);
     });
});
apiRouter.post('/addmenu',function(req,res){
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
apiRouter.put('/updatemenu',function(req,res){

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
apiRouter.get('/searchmenu/:id',function(req,res){
    Menu.findById(req.params.id,function(err,data){
         if(err){
             res.status(400).json(err);
         }
         res.json(data);
         console.log('Searched');
     });
})
apiRouter.delete('/deletemenu/:id',function(req,res){

Menu.remove({_id: req.params.id},function(err,data){
   if(err){
       res.status(404).json(err);
   }
   else{
       res.send("Data has been deleted");
   }
});
});






app.use('/api',apiRouter);



var RestaurantRouter = express.Router();


RestaurantRouter.post('/createRestaurant',function(request,response){

var R=new Restaurant({
   name: request.body.RestaurantName,
   address: request.body.address,
   phone: request.body.phone,
   typeofcuisine: request.body.cuisine,
   tags: request.body.tags,
   hoursofoperation:[{
       day: request.body.day,
       close: request.body.close,
       open: request.body.open

}]
   
});
      R.save(function(error,data){

          if(error){
              response.status(400).json();
          }
          else{
              response.json(data);
              console.log('Restaurant Created');
          }
      });

});


RestaurantRouter.get('/findRestaurant',function(req,res){
     Restaurant.find(function(error,data){
         if(error){
             res.status(400).json(err);
         }
         res.json(data);
     });
});


app.listen(port);

console.log('Server running at port # '+port);