"use strict";

app.controller("DiaryCtrl", function($scope, $rootScope, $location, DiaryFactory, FoodFactory){

	$scope.diaries = [];
	$scope.foods = [];
	$scope.selectedDiary = '';
	// $scope.selectedDiary = 'Diary0';
	$scope.totalCalories = 0;
	$scope.totalFat = 0;
	$scope.totalProtein = 0;
	$scope.totalSodium = 0;
	$scope.totalSugars = 0;

	
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
	//lists all meals on the diary page
	let getAllDiaries = function(){
		DiaryFactory.getDiary($rootScope.user.uid).then(function(FbDiaries) {
			$scope.diaries = FbDiaries;
			console.log('diaries: ', $scope.diaries);
			FoodFactory.getFoodsFB($rootScope.user.uid).then(function(FbFoods){
				console.log('foods from controller', FbFoods);
				FbFoods.forEach(function(food){
					$scope.diaries.forEach(function(diary){
						console.log('foods', food);
						if(food.mealId === diary.id){
							diary.foods.push(food);
						}
					});
				});
			});
		});
	};
	getAllDiaries();

	$scope.deleteDiary = (diaryId) =>{
		DiaryFactory.deleteDiary(diaryId).then((response)=>{
			console.log("delete Diary Response", response);
			getAllDiaries();
		});
	};

	// DiaryFactory.getDiary($rootScope.user.uid).then(function(FbDiaries) {
	// 	$scope.diaries = FbDiaries;
	// 	$scope.diaryByDate = $scope.diaries.filter(function(object){
	// 		return object.date === $scope.today;
	// 	});
	// 	console.log('diaryByDate', $scope.diaryByDate);
	// });



	//accumulate totals for each stat
	// $scope.diaryByDate.forEach(function(diary){
	// 	$scope.totalCalories += diary.totalCalories;
	// 	$scope.totalFat += diary.totalFat;
	// 	$scope.totalProtein += diary.totalProtein;
	// 	$scope.totalSodium += diary.totalSodium;
	// 	$scope.totalSugars += diary.totalSugars;
	// });
});