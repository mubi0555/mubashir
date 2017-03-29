var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose =  require('mongoose');
var morgan = require('morgan'); 
var port = process.env.PORT || 3000;
mongoose.connect('mongodb://localhost:27017/Lasania');

//app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(function(request,response,next){
  response.setHeader('Access-Control-Allow-Origin','*');
  response.setHeader('Access-Control-Allow-Method','GET','POST');
  response.setHeader('Access-Control-Allow-Headers','X-Requested-With,content-type,\Authorization');
  next();
});
app.use(morgan('developer'));
var Menu=require('./apps/models/menus.js');
app.get('/',function(req,res){
    res.send('Welcome to home page');
})

var apiRouter = express.Router();

apiRouter.get('/findmenu',function(req,res){
     Menu.findById(req.body.id,function(err,data){
         if(err){
             res.status(400).json(err);
         }
         res.json(data);
     });
});
apiRouter.post('/addmenu',function(req,res){
    // var menu=req.body.Menu;
    // var price=req.body.price;
    // var catgory=req.body.catgory;
       
  var M=new Menu({
      menu: req.body.menu,
      price:req.body.price,
      catgory: req.body.catgory
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

app.use('/api',apiRouter);

app.listen(port);

console.log('Server running at port # '+port);