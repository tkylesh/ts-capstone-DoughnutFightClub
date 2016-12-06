"use strict";

app.controller("NavCtrl", function($scope, $rootScope){ // NAV CONTROLLER LINE 4 holds a array of nav headers 

	

	$scope.navItems = [{
		name:"Logout",
		url: "#/logout"
	},
	{
		name:"Diary",
		url: "#/auth"
	},
	{
		name:"Add Meal",
		url:"#/auth"
	},
	{
		name:"Search Ingredients",
		url:"#/auth"
	}
	];
});