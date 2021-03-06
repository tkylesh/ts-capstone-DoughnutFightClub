"use strict";

app.controller("DiaryCtrl", function($scope, $rootScope, $route, $location, DiaryFactory, FoodFactory, MealIdService){
	$scope.selectedDiary = '';
	// $scope.selectedDiary = 'Diary0';
	$scope.totalCalories = 0;
	$scope.totalFat = 0;
	$scope.totalProtein = 0;
	$scope.totalSodium = 0;
	$scope.totalSugars = 0;
	$scope.diaries = [];
	$scope.foods = [];
	$scope.diaryDate = new Date();
	
	//initialize materialize date picker
	$('.datepicker').pickadate({
	    selectMonths: true, // Creates a dropdown to control month
	    selectYears: 1, // Creates a dropdown of 1 year to control year
	    format: 'mm/dd/yyyy',
	    max: new Date()
	});

	var $input = $('.datepicker').pickadate();

	// Use the picker object directly.
	var picker = $input.pickadate('picker');

	//getMeals
	//lists all meals on the diary page
	let getAllDiaries = function(){
		DiaryFactory.getDiary($rootScope.user.uid).then(function(FbDiaries) {
			$scope.diaries = FbDiaries;
			// console.log('diaries: ', $scope.diaries);
			FoodFactory.getFoodsFB($rootScope.user.uid).then(function(FbFoods){
				// console.log('foods from controller', FbFoods);
				FbFoods.forEach(function(food){
					$scope.diaries.forEach(function(diary){
						// console.log('foods', food);
						if(food.mealId === diary.id){
							diary.foods = diary.foods || [];
							diary.foods.push(food);
							// console.log('foods array on diary', diary.foods);
						}
					});
				});
			});
		});
	};
	$(document).ready(function(){
		 getAllDiaries();
	});

	//method to calculate the $scope variables that will pass the totals to the diary page.
	let calcDailyTotals = () => {

		DiaryFactory.getDiary($rootScope.user.uid).then(function(FbDiaries) {
			$scope.diaries = FbDiaries;
			$scope.diaryByDate = $scope.diaries.filter(function(diary){
				return diary.date === $scope.stringDate;
			});
			// console.log('diaryByDate', $scope.diaryByDate);
		}).then(()=>{

			FoodFactory.getFoodsFB($rootScope.user.uid).then(function(FbFoods){
				// console.log('foods from controller', FbFoods);
				FbFoods.forEach(function(food){
					$scope.diaryByDate.forEach(function(diary){
						// console.log('foods', food);
						if(food.mealId === diary.id){
							// diary.foods = diary.foods || [];
							$scope.totalCalories += food.calories;
							$scope.totalFat += food.fat;
							$scope.totalProtein += food.protein;
							$scope.totalSodium += food.sodium;
							$scope.totalSugars += food.sugars;
						}
					});
				});
			});
		});
	};

	let clearStats = () => {
		$scope.totalCalories = null;
		$scope.totalFat = null;
		$scope.totalProtein = null;
		$scope.totalSodium = null; 
		$scope.totalSugars = null;
	};

	// get the current date to add to newDiary object
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

		let setStringDate = date;


		$scope.diaryDate = new Date(`${yyyy}`, `${mm-1}`, `${dd}`);
		// console.log('diaryDate: ', $scope.diaryDate);

		MealIdService.setActiveDate(setStringDate);
		$scope.stringDate = MealIdService.getActiveDate();
		// console.log('Active date set to ', MealIdService.getActiveDate());
		// picker.set('select', `${dd} ${mm}, ${yyyy}`, { format: 'd mmmm, yyyy' });
		clearStats();
		calcDailyTotals();
	};
	getDate();

	$scope.onDateChange = () => {
		// event.stopPropagation();
		// event.preventDefault();
		// console.log('onchange event triggered');
		$scope.diaryDate = new Date(picker.get());
		// console.log("diaryDate", $scope.diaryDate);

		MealIdService.setActiveDate(picker.get());
		// console.log('Active date set to ', MealIdService.getActiveDate());
		$scope.stringDate = MealIdService.getActiveDate();
		// console.log("on change stringDate", $scope.stringDate);
		picker.close(true);
		clearStats();
		getAllDiaries();
		calcDailyTotals();
	};


	$scope.deleteDiary = (diaryId) =>{
		DiaryFactory.deleteDiary(diaryId).then((response)=>{
			// console.log("delete Diary Response", response);
			clearStats();
			getAllDiaries();
			calcDailyTotals();
			
			// $route.reload();
		});

	};


	$scope.deleteFood = (foodId, $event) =>{
		// console.log('$event', $event);
		$event.stopPropagation();
		$('.collapsible').collapsible({
      			accordion: false
      	});
		FoodFactory.deleteFood(foodId).then((response)=>{
			// console.log("delete Diary Response", response);
			clearStats();
			getAllDiaries();
			calcDailyTotals();
			
			// $route.reload();
		});
	};
});