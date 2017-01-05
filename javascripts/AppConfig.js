"use strict";

let isAuth = (AuthFactory) =>  new Promise((resolve, reject) => {
	if(AuthFactory.isAuthenticated()){
		resolve();
	} else {
		reject();
	}
});

app.run(function($rootScope, $location, FIREBASE_CONFIG, AuthFactory){
  firebase.initializeApp(FIREBASE_CONFIG);


  $rootScope.$on('$routeChangeStart', function(event, currRoute, prevRoute){

  	let logged = AuthFactory.isAuthenticated("e9bfed54","8f291f15c2b4327bb1b83d321d95d4da");
  	let appTo;

  	if(currRoute.originalPath){
  		appTo = currRoute.originalPath.indexOf('/auth') !== -1;	
  	}
  	
  	if(!appTo && !logged){
  		event.preventDefault();
  		$location.path('/auth');
  	}
  });
});

app.config(function($routeProvider){
	$routeProvider
		.when('/auth', {
			templateUrl:'partials/auth.html',
			controller: 'AuthCtrl'
		})
    .when('/diary',{
      templateUrl:'partials/diary.html',
      controller: 'DiaryCtrl',
      resolve: {isAuth} 
    })
    .when('/search',{
      templateUrl:'partials/search.html',
      controller: 'SearchCtrl',
      resolve: {isAuth} 
    })
    .when('/edit/:id', {
      templateUrl:'partials/edit.html',
      controller: 'EditCtrl',
      resolve: {isAuth}
    })
    .when('/logout', {
      templateUrl:'partials/auth.html',
      controller: 'AuthCtrl',
      resolve: {isAuth} 
    })
		.otherwise('/auth');
});