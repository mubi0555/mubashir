var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose =  require('mongoose');
var morgan = require('morgan'); 
var multer=require('multer');
var port = process.env.PORT || 3000;
mongoose.connect('mongodb://localhost:27017/myproject');
app.use(bodyParser.urlencoded({extended: true})
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
// app.use(multer({ dest: './uploads/',
//  rename: function (fieldname, filename) {
//    return filename;
//  },
// }));
app.use(function(request,response,next){
  response.setHeader('Access-Control-Allow-Origin','*');
  response.setHeader('Access-Control-Allow-Method','GET','POST');
  response.setHeader('Access-Control-Allow-Headers','X-Requested-With,content-type,\Authorization');
  next();
});
app.use(morgan('dev'));
var MenuRoutes=require('./apps/routes/MenuApi.js');
var RestaurantRoutes=require('./apps/routes/RestaurantApi.js');
var MenuDetailsRoutes=require('./apps/routes/menuDetailsApi.js');
app.use('/Menus',MenuRoutes);
app.use('/Restaurant',RestaurantRoutes);
app.use('/MenuDetails',MenuDetailsRoutes);
app.get('/',function(req,res){
    res.sendFile(__dirname+"/public/views/pages/index.html");
});

app.listen(port);

console.log('Server running at port # '+port);