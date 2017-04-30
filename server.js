var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose =  require('mongoose');
var morgan = require('morgan'); 
var port = process.env.PORT || 3000;
mongoose.connect('mongodb://heroku:fzUNhvJzxmbYL2e9suuYhcnBjZkDBbaGBlABlqJKnGYGPl4PFgyEAe53dNFFgnVBnMBib8SMlntoo0C4TkLTcA@candidate.45.mongolayer.com:11331,candidate.42.mongolayer.com:10693/app65734096');
app.use(bodyParser.urlencoded({extended: true})
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

app.use(function(request,response,next){
  response.setHeader('Access-Control-Allow-Origin','*');
  response.setHeader('Access-Control-Allow-Method','GET','POST');
  response.setHeader('Access-Control-Allow-Headers','X-Requested-With,content-type,\Authorization');
  next();
});
app.use(morgan('dev'));
var UserRouter=require('./apps/routes/userRoute.js');
var MenuRoutes=require('./apps/routes/MenuApi.js');
var RestaurantRoutes=require('./apps/routes/RestaurantApi.js');
app.use('/Menus',MenuRoutes);
app.use('/User',UserRouter);
app.use('/Restaurant',RestaurantRoutes);
app.get('/',function(req,res){
    res.sendFile(__dirname+"/public/views/pages/index.html");
});

app.listen(port);

console.log('Server running at port # '+port);