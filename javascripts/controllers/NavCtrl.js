"use strict";

app.controller("NavCtrl", function($scope, $rootScope){ // NAV CONTROLLER LINE 4 holds a array of nav headers 

	

	$scope.navItems = [{
		name:"LOGOUT",
		url: "#/logout"
	},
	{
		name:"DIARY",
		url: "#/diary"
	},
	{
		name: `+ FOOD`,
		url:"#/search",
	}
	];
});