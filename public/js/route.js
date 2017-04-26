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
        .when('/showmenu', {
			templateUrl: 'views/pages/showmenu.html',
			controller: 'MenuCtrl'
		})
        .when('/updatemenu/:id',{
            templateUrl: 'views/pages/updatemenu.html',
            controller: 'UpdateCtrl'
        })
        .when('/home',{
            templateUrl: 'views/pages/home.html',
            controller: 'MenuCtrl'
        })
        
        .otherwise("/home")
        $locationProvider.html5Mode(true);
    }]);