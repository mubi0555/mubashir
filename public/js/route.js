var app=angular.module('MyApp');
 app.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider) {
	$routeProvider
        .when('/signup',{
            templateUrl: 'views/pages/signup.html',
            controller: 'SignUp'
        })
        .when('/login',{
          templateUrl: 'views/pages/login.html',
          controller:'LoginCtrl'
        })
		.when('/createMenu', {
			templateUrl: 'views/pages/createMenu.html',
			controller: 'MenuCtrl'
		})
        .when('/UpdateRest/:id',{
            templateUrl:'views/pages/updateRestaurant.html',
            controller: 'UpdateCtrl'
        })
        .when('/showmenu/:restaurant/:id', {
			templateUrl: 'views/pages/showmenu.html',
			controller: 'ShowMenuCtrl'
		})
        .when('/updatemenu/:id/:rest_id',{
            templateUrl: 'views/pages/updatemenu.html',
            controller: 'ShowMenuCtrl'
        })
        .when('/menuDetails:id/:name/:restID',{
            templateUrl:'views/pages/menuDetails.html',
            controller: 'menuDetailCtrl'
        })
        .when('/showRestaurant',{
            templateUrl: 'views/pages/showRestaurant.html',
            controller: 'MenuCtrl'
        })
        .when('/home',{
            templateUrl: 'views/pages/home.html',
            controller: 'MenuCtrl'
        })
        .when('/createRestaurant',{
            templateUrl: 'views/pages/createRestaurant.html',
            controller: 'MenuCtrl'
        })
        .otherwise("/home")
        $locationProvider.html5Mode(true);
    }]);