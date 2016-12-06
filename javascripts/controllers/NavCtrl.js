"use strict";

app.controller("NavCtrl", function($scope, $rootScope){ // NAV CONTROLLER LINE 4 holds a array of nav headers 

	

	$scope.navItems = [{
		name:"Logout",
		url: "#/logout"
	},
	{
		name:"Diary",
		url: "#/diary"
	},
	{
		name:"Add Diary",
		url:"#/adddiary"
	},
	{
		name:"Add Meal",
		url:"#/addmeal"
	},
	{
		name:"Search Ingredients",
		url:"#/search"
	}
	];
});