"use strict";

app.controller("DiaryCtrl", function($scope, $rootScope, $location, DiaryFactory){
	$scope.diaries = [];

	DiaryFactory.getDiary($rootScope.user.uid).then(function(FbDiaries) {
		$scope.diaries = FbDiaries;
		console.log($scope.diaries);
	});
});