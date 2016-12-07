"use strict";

app.controller("DiaryCtrl", function($scope, $rootScope, $location, DiaryFactory){
	$scope.diaries = [];
	$scope.logs = [];
	$scope.selectedDiary = '';
	$scope.selectedDiary = 'Diary0';
	

	//getMeals
	DiaryFactory.getDiary($rootScope.user.uid).then(function(FbDiaries) {
		$scope.diaries = FbDiaries;
		console.log($scope.diaries);
	});
});