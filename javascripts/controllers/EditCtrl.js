"use strict";

app.controller("EditCtrl", function($scope, $rootScope, $location, $routeParams, NutrixFactory, DiaryFactory, FoodFactory, MealIdService, FIREBASE_CONFIG){
	$scope.searchNutrix= '';
	$scope.searchResults = [];
	$scope.tempFood = {};
	$scope.tempTitleArray = [];
	$scope.existingDiaries = [];
	$scope.editMeal = {};
	$scope.foods = [];


	let mealId = $routeParams.id;
	console.log('$routeParams', mealId);

	DiaryFactory.getSingleDiary(mealId).then((diary) => {
		console.log('diary: ', diary);
		diary.id = mealId;
		$scope.editMeal = diary;

		FoodFactory.getFoodsFB($rootScope.user.uid).then(function(FbFoods){
			// console.log('foods from controller', FbFoods);
			FbFoods.forEach(function(food){
				// console.log('foods', food);
				if(food.mealId === $scope.editMeal.id){
					diary.foods = diary.foods || [];
					diary.foods.push(food);
					// console.log('foods array on diary', diary.foods);
				}
			});
		});
	});


	$scope.addEditedDiary = () => {
		DiaryFactory.editDiary($scope.editMeal).then((response) =>{
			$scope.editMeal = {};
			$location.url("/diary");
		});
	};

	$scope.NutrixSearch = function(){
		NutrixFactory.ingredientList($scope.searchNutrix).then(function(response){
			console.log('Nutrix Search Results', response);
			$scope.searchResults = response;
		}).catch((error) => {
			console.log('Nutrix Search Error', error);
		});
	};
});