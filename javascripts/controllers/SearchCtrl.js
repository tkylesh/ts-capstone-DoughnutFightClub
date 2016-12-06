"use strict";

app.controller("SearchCtrl", function($scope, $rootScope, $location, NutrixFactory){
	$scope.searchNutrix= '';
	$scope.searchResults = [];


	let uid = $rootScope.user.uid;

	$scope.NutrixSearch = function(){
		NutrixFactory.ingredientList($scope.searchNutrix).then(function(response){
			console.log('Nutrix Search Results', response);
			$scope.searchResults = response;
		}).catch((error) => {
			console.log('Nutrix Search Error', error);
		});
	};
});