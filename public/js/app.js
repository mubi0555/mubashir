var app=angular.module('MyApp',['ngRoute']);
 app.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider) {
	$routeProvider
		.when('/createMenu', {
			templateUrl: 'views/pages/createMenu.html',
			controller: 'CreatMenu'
		})
        .when('/showmenu', {
			templateUrl: 'views/pages/showmenu.html',
			controller: 'MAinCtrl'
		})
        .when('/updatemenu/:id',{
            templateUrl: 'views/pages/updatemenu.html',
            controller: 'UpdateCtrl'
        })
        
        .otherwise("/")
        $locationProvider.html5Mode(true);
    }]);
app.controller('UpdateCtrl',function($scope,$http,$routeParams,$location){
  $scope.SearchMenu={};
  //console.log($routeParams.id);
// $scope.Search=function(id){

    $http.get('/api/searchmenu/'+$routeParams.id)
    .then(function(res){
        $scope.SearchMenu=res.data;
        console.log(res.data);
    },function(err){
        console.log(err);
    })


   $scope.UpdateMenu=function(id){
//       var data={menu: $scope.menu, price:$scope.price,catagory:$scope.catagory};
 
    $http.put('/api/updatemenu/',$scope.SearchMenu)
    .then(function(response){
        $location.path('/showmenu');
        console.log('Data has been Updated');
    },function(err){
        console.log(err);
    })
}
});

app.controller('MAinCtrl',function($scope,$http,$location){


$scope.Updatepage=function(id){

    $location.path('/updatemenu/'+id);
}

$scope.DeleteMenu=function(id){
    
   $http.delete('/api/deletemenu/'+id)
    .then(function(response){
        console.log('Deleted');
    },function(err){
        console.log(err);
    })

}
$scope.AllMenus=[];

    $http.get('/api/findmenu')
    .then(function(response){
        $scope.AllMenus=response.data;
    },function(err){
        console.log(err);
    })

});

app.controller('CreatMenu',function($scope,$http){
    $scope.menu='';
    $scope.price='';
    $scope.catagory='';


    $scope.AddMenu=function(){
    var data={menu: $scope.menu, price:$scope.price,catagory:$scope.catagory};

           $http.post('api/addmenu',data)
            .then(function(response){
            console.log("Saved");
            },function(err){
                console.log(err);
            });

    }
});
