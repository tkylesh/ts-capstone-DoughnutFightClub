"use strict";

app.controller("AddDiaryCtrl", function($scope, $rootScope, $location, DiaryFactory, LogFactory){

	$scope.newDiary = {};

	$scope.addNewDiary = function(){
		$scope.newDiary.uid = $rootScope.user.uid;
		DiaryFactory.postNewDiary($scope.newDiary).then(function(diaryId){
			$location.url("/diary");
			$scope.newDiary = {};
		});
	};
});