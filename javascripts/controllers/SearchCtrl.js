"use strict";

app.controller("SearchCtrl", function($scope, $rootScope, $location, NutrixFactory, DiaryFactory, FoodFactory, MealIdService, FIREBASE_CONFIG){
	$scope.searchNutrix= '';
	$scope.searchResults = [];
	$scope.alterResults = [];
	$scope.newDiary = {};
	$scope.tempFood = {};
	$scope.tempTitleArray = [];
	$scope.existingDiaries = [];
	$scope.imageFlag = false;
	

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
	$scope.date = getDate();



	//activate the google materialize modal
	$('.modal').modal();
	$('#modal1').modal('open');

	//Set the Meal category to active when a link is clicked
	$scope.menuItems = ['BREAKFAST', 'LUNCH', 'DINNER', 'SNACKS'];
	$scope.activeMenu = $scope.menuItems[0];

	$scope.setActive = function(menuItem) {
	    $scope.activeMenu = menuItem;
	    $scope.newDiary.category = $scope.activeMenu;
	    $scope.newDiary.date = getDate();
	    $scope.newDiary.uid = $rootScope.user.uid;
	    // console.log('$scope.newDiary.category ', $scope.newDiary.category);
	    // console.log('$scope.newDiary.date', getDate());
	    // console.log('$scope.newDiary.uid', $scope.newDiary.uid);
	    $('#modal1').modal('close');

		

		// getMeals
		DiaryFactory.getDiary($rootScope.user.uid).then(function(FbDiaries) {
			$scope.existingDiaries = FbDiaries;
			// console.log('existing diaries: ', $scope.existingDiaries);

			$scope.existingDiaries.forEach(function(diary){
				// console.log("existing diary uid", diary.uid);
				// console.log("uid", $rootScope.user.uid);
				if(diary.uid === $rootScope.user.uid){
					// console.log("existing diary date", diary.date);
					// console.log("date", $scope.newDiary.date);
					if(diary.date === $scope.newDiary.date){
						// console.log("existing diary category", diary.category);
						// console.log("category", $scope.newDiary.category);
						if(diary.category === $scope.newDiary.category){
							// console.log("meal id", diary.id);
							$scope.mealId = diary.id;
						}
					}
				}
			});

			if ($scope.mealId !== undefined){
				// console.log(`diary with id ${$scope.mealId} already exists`);
				$scope.newDiary.mealId = $scope.mealId;
				MealIdService.setMealId($scope.newDiary.mealId);
				// console.log('get Meal Id: ', MealIdService.getMealId());
			}else {
				// console.log('new meal to post: ', $scope.newDiary);
				DiaryFactory.postNewDiary($scope.newDiary).then(function(diary){
					// $location.url("/diary");
					// console.log('new diary', diary.name);
					$scope.newDiary.mealId = diary.name;
					MealIdService.setMealId($scope.newDiary.mealId);
					// console.log('get Meal Id: ', MealIdService.getMealId());
				});
			}
		});
	};
	$scope.category = $scope.activeMenu;


	// let uid = $rootScope.user.uid;


	$scope.NutrixSearch = function(){
		$scope.imageFlag = true;
		NutrixFactory.ingredientList($scope.searchNutrix).then(function(response){
			console.log('Nutrix Search Results', response);
			$scope.searchResults = response;
			$scope.searchResults.forEach(function(item){
				NutrixFactory.getImages(item.fields.item_name).then(function(response){
					// console.log('getImages response status', response.status);
					console.log('SUCCESS', response);
					response.data.foods.forEach(function(imageItem){
						console.log('image url', imageItem.photo.thumb);
						item.image = imageItem.photo.thumb;
						$scope.alterResults.push(item);
						console.log('altered searchResults array', $scope.alterResults);
					});
					// $scope.searchResults = response.data.foods;
				}, function(error){
					console.log('ERROR',error);
					item.image = "/Images/apple-grey_image.png";
					$scope.alterResults.push(item);
					console.log('altered searchResults array', $scope.alterResults);
				});
			});
		}).catch((error) => {
			console.log('Nutrix Search Error', error);
		});
	};

	let addNewFood= function(tempFood){
		$scope.newDiary.calories = tempFood.calories;
		$scope.newDiary.fat = tempFood.fat;
		$scope.newDiary.protein = tempFood.protein;
		$scope.newDiary.sugars = tempFood.sugars;
		$scope.newDiary.sodium = tempFood.sodium;
		$scope.newDiary.title = tempFood.title;
	    $scope.newDiary.date = getDate();
	    $scope.newDiary.mealId = MealIdService.getMealId();


	    $scope.newDiary.uid = $rootScope.user.uid;

	    for (let key in $scope.newDiary) {
	        if ($scope.newDiary[key] === "") {
	          window.alert("Please fill all fields!");
	        }
      	}

		console.log('new food object to post or put', $scope.newDiary);
		FoodFactory.postFood($scope.newDiary).then((foodId)=>{
			Materialize.toast(`${$scope.newDiary.title} added to ${$scope.activeMenu} ${$scope.newDiary.date}`, 4000);
			console.log("new foodId: ", foodId);
			$scope.newDiary = {};
		});
	};	


	$scope.constructFoods = (ingredient, calories, fat, protein, sodium, sugars)=>{
		$scope.tempFood.title = ingredient;
		$scope.tempFood.calories = calories;
		$scope.tempFood.fat = fat;
		$scope.tempFood.protein = protein;
		$scope.tempFood.sodium = sodium;
		$scope.tempFood.sugars = sugars;
		$scope.tempFood.date = getDate();

		addNewFood($scope.tempFood);
	};
});





