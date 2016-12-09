"use strict";

app.controller("DiaryCtrl", function($scope, $rootScope, $location, DiaryFactory){
	$scope.diaries = [];
	$scope.logs = [];
	$scope.selectedDiary = '';
	$scope.selectedDiary = 'Diary0';

	
	//get the current date to add to newDiary object
	let getDate = () => {
		let date = new Date();
		let dd = date.getDate();
		let mm = date.getMonth()+1;//January is 0
		let yyyy = date.getFullYear();
		if(dd<10){
			dd='0'+dd;
		}
		if(mm<10){
			mm='0'+mm;
		}
		date = mm+'/'+dd+'/'+yyyy;
		return date;
	};

	$scope.today = getDate();

	//getMeals
	DiaryFactory.getDiary($rootScope.user.uid).then(function(FbDiaries) {
		$scope.diaries = FbDiaries;
		console.log('diaries: ', $scope.diaries);
	});


	DiaryFactory.getDiary($rootScope.user.uid).then(function(FbDiaries) {
		$scope.diaries = FbDiaries;
		$scope.diaryByDate = $scope.diaries.filter(function(object){
			return object.date === "12/05/2016";
		});
		console.log($scope.diaryByDate);
	});
});