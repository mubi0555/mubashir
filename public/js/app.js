var app=angular.module('MyApp',['ngRoute']);

app.factory('CRUDdata',['$http',function($http){

var url='/api/';
var CRUDdata={};

CRUDdata.getAllMenus=function(){
    return $http.get(url+'findmenu');
}
CRUDdata.searchMenu=function(id){
    return $http.get(url+'searchmenu/'+id);
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
return CRUDdata;
}]);

 app.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider) {
	$routeProvider
		.when('/createMenu', {
			templateUrl: 'views/pages/createMenu.html',
			controller: 'MenuCtrl'
		})
        .when('/showmenu', {
			templateUrl: 'views/pages/showmenu.html',
			controller: 'MenuCtrl'
		})
        .when('/updatemenu/:id',{
            templateUrl: 'views/pages/updatemenu.html',
            controller: 'UpdateCtrl'
        })
        
        .otherwise("/")
        $locationProvider.html5Mode(true);
    }]);



app.controller('MenuCtrl',function($scope,CRUDdata,$routeParams,$location){

$scope.AllMenus=[];

    CRUDdata.getAllMenus()
    .then(function(response){
        $scope.AllMenus=response.data;
    },function(err){
        console.log(err);
    })


    $scope.menu='';
    $scope.price='';
    $scope.catagory='';


    $scope.AddMenu=function(){
    var data={menu: $scope.menu, price:$scope.price,catagory:$scope.catagory};

           CRUDdata.createMenu(data)
            .then(function(response){
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

app.controller('UpdateCtrl',function($scope,CRUDdata,$routeParams){
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
        console.log('Data has been Updated');
    },function(err){
        console.log(err);
    })
}


});


