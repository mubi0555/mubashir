var app=angular.module('MyApp',['ngRoute']);


app.factory('CRUDdata',['$http',function($http){

var url='/Menus/';
var CRUDdata={};

CRUDdata.getAllMenus=function(name){
    return $http.get(url+'findmenu/'+name);
}
CRUDdata.createMenu=function(data){
    return $http.post(url+'addmenu',data);
}
CRUDdata.updatMenu=function(data){
    return $http.put(url+'updatemenu',data);
}
CRUDdata.deleteMenu=function(id){
    return $http.delete(url+'deletemenu/'+id);
}
CRUDdata.searchMenu=function(id){
    return $http.get(url+'searchmenu/'+id);
}
return CRUDdata;
}]);
app.factory('RestaurantServices',['$http',function($http){
     restaurantUrl='/Restaurant/';
     var RestaurantData={};
     RestaurantData.createRestaurant=function(data){
         return $http.post(restaurantUrl+'createRestaurant',data);
     }
     RestaurantData.getAllRestaurant=function(name){
         return $http.get(restaurantUrl+'findRestaurant/:'+name);
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
})

app.controller('MenuCtrl',function($scope,CRUDdata,$routeParams,$location,RestaurantServices){

$scope.AllMenus=[];
$scope.AllRestaurants=[];
    $scope.GO=function(){
        CRUDdata.getAllMenus($scope.Search)
        .then(function(res){
            $scope.AllMenus=res.data;
            console.log('Searching');
            console.log($scope.AllMenus);
        },function(err){
            console.log(err);
        });
        if($scope.AllMenus.length==0){
           RestaurantServices.getAllRestaurant($scope.Search)
           .then(function(res){
                  $scope.AllRestaurants=res.data;
                  console.log($scope.AllRestaurants);
           },function(err){
               console.log(err);
           })
        }
    }
// 
//     $scope.GO=function(){
//         RestaurantServices.getAllRestaurant($scope.Search)
//         .then(function(res){
//             $scope.AllRestaurants=res.data;
//             console.log('Searching');
//             console.log($scope.AllRestaurants);
//         },function(err){
//             console.log(err);
//         })
//     }
$scope.restaurant='';
$scope.address='';
$scope.phone='';
$scope.tags='';
$scope.typeofcuisine=''


$scope.AddRetaurant=function(){
    var data={
        restaurant: $scope.restaurant,
        address: $scope.address,
        phone: $scope.phone,
        tags: $scope.tags,
        typeofcuisine: $scope.typeofcuisine
    }

        RestaurantServices.createRestaurant(data)
        .then(function(res){
            $location.path('/home')
            console.log(res.data);
        },function(err){
            console.log(err);
        });

}

    $scope.menu='';
    $scope.price='';
    $scope.catagory='';
    $scope.serving='';

    $scope.AddMenu=function(){
    var data={menu: $scope.menu, price:$scope.price,catagory:$scope.catagory, serving:$scope.serving};

           CRUDdata.createMenu(data)
            .then(function(response){
            $location.path('/home');
            console.log("Saved");
            },function(err){
                console.log(err);
            });


    }

$scope.DeleteMenu=function(id){
    
   CRUDdata.deleteMenu(id)
    .then(function(response){
        console.log('Deleted');
    },function(err){
        console.log(err);
    })

}


$scope.Updatepage=function(id){

    $location.path('/updatemenu/'+id);
}


});

app.controller('UpdateCtrl',function($scope,CRUDdata,$routeParams,$location){
  $scope.SearchMenu={};

Search($routeParams.id);

function Search(id){
console.log($routeParams.id);
    CRUDdata.searchMenu(id)
    .then(function(res){
        $scope.SearchMenu=res.data;
        console.log(res.data);
    },function(err){
        console.log(err);
    });
}

   $scope.UpdateMenu=function(id){ 
    CRUDdata.updatMenu($scope.SearchMenu)
    .then(function(response){
        $location.path('/showmenu');
        console.log(response.data);
        
        console.log('Data has been Updated');
    },function(err){
        console.log(err);
    })
}

});


