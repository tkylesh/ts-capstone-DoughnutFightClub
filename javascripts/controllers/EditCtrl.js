"use strict";

app.controller("EditCtrl", function($scope, $rootScope, $location, NutrixFactory, DiaryFactory, FoodFactory, MealIdService, FIREBASE_CONFIG){

	$scope.editMeal = {};
	let mealId = $routeParams.id;
	console.log('$routeParams', mealId);

	DiaryFactory.getSingleDiary(mealId).then((diary) => {
		diary.id = mealId;
		$scope.editMeal = diary;
	});

	$scope.addEditedDiary = () => {
		DiaryFactory.editDiary($scope.editMeal).then((response){
			$scope.editMeal = {};
			$location.url("/diary");
		});
	};
});