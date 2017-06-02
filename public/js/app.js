var app=angular.module('MyApp',['ngRoute']);

app.factory('DetailsData',['$http',function($http){
    var url='/MenuDetails/';
    var DetailsData={};

    DetailsData.create=function(id,data){
        return $http.post(url+'addDetails/'+id,data);
    }
    DetailsData.search=function(id){
        return $http.get(url+'searchMenu/'+id);
    }
    return DetailsData;
}]);


app.factory('MenuData',['$http',function($http){

var url='/Menus/';
var MenuData={};

MenuData.getAllMenus=function(name){
    return $http.get(url+'findmenu/'+name);
}
MenuData.createMenu=function(data){
    return $http.post(url+'addmenu',data);
}
MenuData.updatMenu=function(data){
    return $http.put(url+'updatemenu',data);
}
MenuData.deleteMenu=function(id){
    return $http.delete(url+'deletemenu/'+id);
}
MenuData.searchMenu=function(id){
    return $http.get(url+'searchmenu/'+id);
}
MenuData.searchOneMenu=function(id){
    return $http.get(url+'SearchOneMenu/'+id);
}
return MenuData;
}]);
app.factory('RestaurantServices',['$http',function($http){
     restaurantUrl='/Restaurant/';
     var RestaurantData={};
     RestaurantData.restaurantId=null;

     RestaurantData.createRestaurant=function(data){
         return $http.post(restaurantUrl+'createRestaurant',data);
     }
     RestaurantData.getAllRestaurant=function(){
         return $http.get(restaurantUrl+'findRestaurant');
     }
     RestaurantData.Delete=function(id){
         return $http.delete(restaurantUrl+'deleteRestaurants/'+id);
     }
     RestaurantData.searchRestaurant=function(id){
         return $http.get(restaurantUrl+'searchRestaurant/'+id);
     }
     RestaurantData.updateRestaurant=function(data){
         return $http.put(restaurantUrl+'updaterestaurant',data);
     }
     return RestaurantData;
}]);
app.factory('LoginService',['$http',function($http){
   var loginUrl='/User/';
   var LoginData={};
   LoginData.createUser=function(data){
       return $http.post(loginUrl+'createUser',data);
   }
   LoginData.AuthenticateUser=function(data){

       return $http.post(loginUrl+'loginAuthentication',data);
   }
   return LoginData;
}]);


app.controller('LoginCtrl',function(LoginService,$scope){
    $scope.email='';
    $scope.password='';
    $scope.Login=function(){
        var SearchData={
            email: $scope.email,
            password: $scope.password
        }
        LoginService.AuthenticateUser(SearchData)
        .then(function(response){
            console.log('Authenticated user');
        },function(err){
            console.log(err);
        })
    }

});

app.controller('SignUp',function(LoginService,$scope){
    $scope.name='';
    $scope.email='';
    $scope.password='';

    $scope.SignUP=function(){
        var SignUpData={
            name: $scope.name,
            email: $scope.email,
            password: $scope.password
        };
        LoginService.createUser(SignUpData)
        .then(function(res){
            console.log('You have successfully signup');
        },function(err){
            console.log(err);
        });
    }
});

app.controller('MenuCtrl',function($scope,MenuData,$routeParams,$location,RestaurantServices){

    

$scope.AllMenus=[];
$scope.AllRestaurants=[];

RestaurantServices.getAllRestaurant()
.then(function(res){
$scope.AllRestaurants=res.data;
console.log(res.data);
},function(err){
    console.log(err);
});
    $scope.GO=function(){
        MenuData.getAllMenus($scope.Search)
        .then(function(res){
            $scope.AllMenus=res.data;
            console.log('Searching');
            console.log($scope.AllMenus);
        },function(err){
            console.log(err);
        });
    }
$scope.restaurant='';
$scope.address='';
$scope.phone='';
$scope.timings='';
$scope.restaurantID='';
$scope.AddRestaurant=function(){
     
    var data={
        restaurant: $scope.restaurant,
        address: $scope.address,
        phone: $scope.phone,
        timings: $scope.timings,
    }

if($scope.restaurant==''||$scope.address==''||$scope.phone==''||$scope.timings==''){
    alert('Please fill all fields');
    return false;
}

        RestaurantServices.createRestaurant(data)
        .then(function(res){
            RestaurantServices.restaurantId=res.data._id;
            console.log(RestaurantServices.restaurantId);
          $scope.AllRestaurants.push(res.data);
          $scope.restaurant='';
$scope.address='';
$scope.phone='';
$scope.timings='';
            console.log(res.data);
        },function(err){
            console.log(err);
        });

}

    

    var index;
$scope.DeleteRestaurant=function(id,data){
    console.log(data);
      index= $scope.AllRestaurants.indexOf(data);
      console.log(index);
if (index > -1) {
    $scope.AllRestaurants.splice(index, 1);
}
        console.log($scope.AllRestaurants);
    RestaurantServices.Delete(id)
    .then(function(res){
      console.log("Restaurant deleted")
    },function(err){
        console.log(err);
    });
    
}

$scope.UpdateRestautantPage=function(id){
    $location.path('/UpdateRest/'+id);
}

$scope.ShowMenuPage=function(Restaurant){
    $location.path('/showmenu/'+Restaurant.restaurant+'/'+Restaurant._id);
}

});


app.controller('menuDetailCtrl',function($scope,$routeParams,$location,DetailsData ){
    $scope.getMenuDetails={};
    $scope.catagory='';
    $scope.serving='';
    $scope.quantity='';
    $scope.glutinfree='';


$scope.checkSearch={};
$scope.ShowMenu=function(){
DetailsData.search($routeParams.id)
.then(function(response){
    $scope.checkSearch=response.data;
if($scope.checkSearch.catagory==null|| $scope.checkSearch.serving==null||$scope.checkSearch.glutinfree==null||
$scope.checkSearch.quantity==null){
    alert('Please add detail first');
}
else{
 $scope.getMenuDetails=response.data;
}
    
  
console.log($scope.getMenuDetails);
},function(err){
    console.log(err);
});


}
$scope.checkData={};

    $scope.DetailMenu=function(){

        var data={
            catagory: $scope.catagory,
            serving: $scope.serving,
            quantity: $scope.quantity,
            glutinfree: $scope.glutinfree
        }
        if($scope.catagory==''|| $scope.serving==''||$scope.quantity==''||$scope.glutinfree==''){
            alert('Please fill all the fields');
            return false
        }
        DetailsData.search($routeParams.id)
        .then(function(res){
            $scope.checkData=res.data;
            console.log($scope.checkData);
            if($scope.checkData.glutinfree==null||$scope.checkData.serving==null||$scope.checkData.quantity==null||
            $scope.checkData.catagory==null
            ){
 
    DetailsData.create($routeParams.id,data)
      .then(function(res){
           console.log(res.data);
           alert('You have successfully added details');
           $scope.catagory='';
           $scope.serving='';
           $scope.quantity='';
           $scope.glutinfree='';
      },function(err){
          console.log(err);
      });
            }
            else{
                alert('You have already added details');
                $scope.catagory='';
           $scope.serving='';
           $scope.quantity='';
           $scope.glutinfree='';
            }

        },function(error){
            console.log(error);

        });
      



    }

});

app.controller('ShowMenuCtrl',function($scope,$rootScope,MenuData,RestaurantServices,$routeParams,$location){
$scope.getMenus={};
$scope.getRestaurant={};
$scope.searchRest={};
$scope.restName=$routeParams.restaurant;
$rootScope.RestaurantName=$routeParams.restaurant;
console.log($scope.restName);
console.log($routeParams.id);
 var index_rest;
RestaurantServices.searchRestaurant($routeParams.id)
.then(function(res){
    $scope.searchRest=res.data;
    console.log($scope.searchRest);
},function(err){
console.log(err);
});

var index_rest;
RestaurantServices.getAllRestaurant()
.then(function(res){
$scope.getRestaurant=res.data;
index_rest=arrayObjectIndexOf($scope.getRestaurant,$scope.searchRest);
$scope.searchRest=res.data[index_rest];
console.log(res.data);

  console.log(index_rest);

console.log($scope.getRestaurant);
console.log('Restaurants get');
},function(err){
    console.log(err);
});

$scope.MenuDetailPage=function(id){
    $location.path('/menuDetails'+id);
}

function arrayObjectIndexOf(getRestaurant,searchRest){
    for(var i = 0; i < getRestaurant.length; i++){
        if(angular.equals(getRestaurant[i], searchRest)){
            return i;
            
        }
    };
     return i;
}


console.log($scope.getRestaurant);

    $scope.menu='';
    $scope.price='';
    $scope.typesofcuisine='';
    $scope.ID='';
    $scope.AddMenu=function(){
    var data={menu: $scope.menu,
         price:$scope.price,
         typesofcuisine:$scope.typesofcuisine,
            ID: $routeParams.id
    };
    if($scope.menu==''|| $scope.price==''|| $scope.typesofcuisine==''){
        alert('Please Fill all the fields');
        return false;
    }

           MenuData.createMenu(data)
            .then(function(response){
                $scope.getMenus.push(response.data);
                console.log(data);
                console.log(response);
                    $scope.menu='';
                    $scope.price='';
                    $scope.typesofcuisine='';
            console.log("Saved");
            
            },function(err){
                console.log(err);
            });


    }


Search($routeParams.id);

function Search(id){
    MenuData.searchMenu(id)
    .then(function(res){
        $scope.getMenus=res.data;
        console.log(res.data);
    },function(err){
        console.log(err);
    });
}
var index;
$scope.DeleteMenu=function(id,data){
      console.log(data);
      index= $scope.getMenus.indexOf(data);
      console.log(index);
if (index > -1) {
    $scope.getMenus.splice(index, 1);
}
        console.log($scope.getMenus);
   MenuData.deleteMenu(id)
    .then(function(response){
        console.log('Deleted');
    },function(err){
        console.log(err);
    })

}

$scope.UpdateMenuPAge=function(id,rest_id){

    $location.path('/updatemenu/'+id+'/'+rest_id);
    console.log(rest_id);
}

});

app.controller('UpdateMenuCtrl',function($scope,MenuData,$routeParams,$location,$rootScope){
 //   $scope.RestName=$rootScope.RestaurantName;
  $scope.SearchMenu={};
  var restaurant_id=$routeParams.rest_id;
  console.log(restaurant_id);
  SearchMenus($routeParams.id);
  function SearchMenus(id){
console.log($routeParams.id);
    MenuData.searchOneMenu(id)
    .then(function(res){
        $scope.SearchMenu=res.data;
    },function(err){
        console.log(err);
    });
}



  $scope.UpdateMenu=function(id){ 
if($scope.SearchMenu.menu==''|| $scope.SearchMenu.price==''|| $scope.SearchMenu.catagory==''||
$scope.SearchMenu.quantity==''|| $scope.SearchMenu.glutinfree==''
){
    alert('Please fill all fields');
    return false;
}


    MenuData.updatMenu($scope.SearchMenu)
    .then(function(response){
        $location.path('/showmenu/'+$rootScope.RestaurantName+'/'+restaurant_id);
        console.log('Data has been Updated');
    },function(err){
        console.log(err);
    })
}
});
app.controller('UpdateCtrl',function($scope,RestaurantServices,$routeParams,$location,MenuData){
  $scope.SearchRestaurant={};


Search($routeParams.id);
console.log($scope.RestaurantName);
function Search(id){
console.log($routeParams.id);
    RestaurantServices.searchRestaurant(id)
    .then(function(res){
        $scope.SearchRestaurant=res.data;
        console.log(res.data);
    },function(err){
        console.log(err);
    });
}
   $scope.UpdateRest=function(id){ 
 if($scope.SearchRestaurant.restaurant==''||$scope.SearchRestaurant.address==''||
$scope.SearchRestaurant.phone=='' || $scope.SearchRestaurant.timings==''
){
    alert('Please fill all fields');
    return false;
}
 console.log($scope.SearchRestaurant.restaurant+':'+$scope.SearchRestaurant.timings);
    RestaurantServices.updateRestaurant($scope.SearchRestaurant)
    .then(function(response){
        $location.path('/showRestaurant');
        console.log(response.data);
        console.log('Restaurant has been Updated');
    },function(err){
        console.log(err);
    })
}

});


