var app=angular.module('MyApp',['ngRoute']);


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
    $location.path('/updateRestaurant/'+id);
}

$scope.ShowMenuPage=function(Restaurant){
    $location.path('/showmenu/'+Restaurant._id);
}

});

app.controller('ShowMenuCtrl',function($scope,MenuData,RestaurantServices,$routeParams,$location){
$scope.getMenus={};
$scope.RestaurantName=$routeParams.restaurant;
    $scope.menu='';
    $scope.price='';
    $scope.catagory='';
    $scope.serving='';
    $scope.quantity='';
    $scope.details='';
    $scope.glutinfree='';
    $scope.ID='';
    $scope.AddMenu=function(){
    var data={menu: $scope.menu,
         price:$scope.price,
         catagory:$scope.catagory,
          serving:$scope.serving,
           quantity: $scope.quantity,
             details:  $scope.details,
             glutinfree: $scope.glutinfree,
            ID: $routeParams.id
    };

           MenuData.createMenu(data)
            .then(function(response){
                $scope.getMenus.push(response.data);
                console.log(data);
                console.log(response);
                    $scope.menu='';
                    $scope.price='';
                    $scope.catagory='';
                    $scope.serving='';
                    $scope.quantity='';
                    $scope.details='';
                    $scope.glutinfree='';
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

app.controller('UpdateMenuCtrl',function($scope,MenuData,$routeParams,$location){
  $scope.SearchMenu={};
  var restaurant_id=$routeParams.rest_id;
  SearchMenus($routeParams.id);
  function SearchMenus(id){
console.log($routeParams.id);
    MenuData.searchOneMenu(id)
    .then(function(res){
        $scope.SearchMenu=res.data;
      //  $scope.SearchMenu=restaurant_id;
        console.log(res.data);
    },function(err){
        console.log(err);
    });
}

  $scope.UpdateMenu=function(id){ 
    MenuData.updatMenu($scope.SearchMenu)
    .then(function(response){
        $location.path('/showmenu/'+restaurant_id);
        console.log(restaurant_id);
        console.log(response.data);
        
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
    RestaurantServices.updateRestaurant($scope.SearchRestaurant)
    .then(function(response){
        console.log(response.data);
        console.log('Restaurant has been Updated');
    },function(err){
        console.log(err);
    })
}

});


