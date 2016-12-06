"use strict";

app.controller("DiaryCtrl", function($scope, $rootScope, $location, DiaryFactory, LogFactory){
	$scope.diaries = [];
	$scope.logs = [];
	$scope.selectedDiary = '';
	$scope.selectedDiary = 'Diary0';
	


	DiaryFactory.getDiary($rootScope.user.uid).then(function(FbDiaries) {
		$scope.diaries = FbDiaries;
		console.log($scope.diaries);
	});

	//gets meals of a specific diary;
	LogFactory.getLogs($scope.selectedDiary).then(function(FbDiaryLogs) {
		$scope.logs = FbDiaryLogs;
		console.log($scope.logs);
	});
});