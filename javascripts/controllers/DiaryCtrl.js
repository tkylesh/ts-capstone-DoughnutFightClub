"use strict";

app.controller("DiaryCtrl", function($scope, $rootScope, $location, DiaryFactory){
	$scope.Diary = {};

	DiaryFactory.getDiary($rootScope.user.uid).then(function(diary) {
		$scope.Diary = diary;
		console.log(diary);
	});
});