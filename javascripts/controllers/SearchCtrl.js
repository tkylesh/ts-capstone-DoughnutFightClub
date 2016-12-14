"use strict";

app.controller("SearchCtrl", function($scope, $rootScope, $location, NutrixFactory, DiaryFactory, FoodFactory, FIREBASE_CONFIG){
	$scope.searchNutrix= '';
	$scope.searchResults = [];
	$scope.newDiary = {};
	$scope.tempFood = {};
	$scope.tempTitleArray = [];
	$scope.existingDiaries = [];



	//---!!!messing around with firebase methods!!!---//
	//checks firebase for existing diaries
	// let ref = firebase.database().ref(`/meals`);

	// ref.on("value", function(snapshot) {
	// 	console.log('snapshot: ', snapshot.exportVal());
	// 	snapshot.forEach(function(childSnapshot) {
	// 		if (childSnapshot.child('uid').val() === $rootScope.user.uid){

	// 			let location = childSnapshot.ref;
	// 			console.log('diary at '+location+' is one of your meal logs.');

	// 			if (childSnapshot.hasChild('ingredients')){
	// 				let location = childSnapshot.ref;
	// 				console.log('diary at '+location+' has ingredients list already ("'+childSnapshot.val().ingredients+'").');
	// 			}

	// 			console.log('childSnapshot', childSnapshot.key);
	// 			childSnapshot.forEach(function(childofchildSnapshot){
	// 			console.log('key: ', childofchildSnapshot.key, ' / value: ', childofchildSnapshot.val());
	// 			});
	// 		}
			
	// 	});
	// });
	//---!!!messing around with firebase methods!!!---//


	



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

	// let getMatchingMealId = () => {
	// 	//checks firebase for existing diaries
	// 	let ref = firebase.database().ref(`/meals`);

	// 	ref.on("value", function(snapshot) {
	// 		console.log('snapshot: ', snapshot.exportVal());
	// 		snapshot.forEach(function(childSnapshot) {
	// 			// console.log('childSnapshot', childSnapshot.exportVal());
	// 			// console.log('childSnapshot.uid', childSnapshot.child('uid').val());
	// 			// console.log('user id rootScope', $rootScope.user.uid);
	// 			// console.log('childSnapshot.date', childSnapshot.child('date').val());
	// 			// console.log('newDiary date', $scope.newDiary.date);
	// 			// console.log('childSnapshot.category', childSnapshot.child('category').val());
	// 			// console.log('newDiary category', $scope.newDiary.category);
	// 			if (childSnapshot.child('uid').val() === $rootScope.user.uid){
	// 				if(childSnapshot.child('date').val()=== $scope.newDiary.date){
	// 					if(childSnapshot.child('category').val() === $scope.newDiary.category){
	// 						console.log('childSnapshot.key', childSnapshot.key);
	// 						$scope.mealId = childSnapshot.key;
	// 					}
	// 				}
	// 			}
	// 		});
	// 	});
	// };

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
			console.log('existing diaries: ', $scope.existingDiaries);

			$scope.existingDiaries.forEach(function(diary){
				console.log("existing diary uid", diary.uid);
				console.log("uid", $rootScope.user.uid);
				if(diary.uid === $rootScope.user.uid){
					console.log("existing diary date", diary.date);
					console.log("date", $scope.newDiary.date);
					if(diary.date === $scope.newDiary.date){
						console.log("existing diary category", diary.category);
						console.log("category", $scope.newDiary.category);
						if(diary.category === $scope.newDiary.category){
							console.log("meal id", diary.id);
							$scope.mealId = diary.id;
						}
					}
				}
			});

			console.log('mealId', $scope.mealId);

			if ($scope.mealId !== undefined){
				console.log(`diary with id ${$scope.mealId} already exists`);
				$scope.newDiary.mealId = $scope.mealId;
			}else {
				console.log('new meal to post: ', $scope.newDiary);
				DiaryFactory.postNewDiary($scope.newDiary).then(function(diaryId){
					// $location.url("/diary");
					$scope.newDiary.mealId = diaryId;
				});
			}
		});
	};
	$scope.category = $scope.activeMenu;


	// let uid = $rootScope.user.uid;

	$scope.NutrixSearch = function(){
		NutrixFactory.ingredientList($scope.searchNutrix).then(function(response){
			console.log('Nutrix Search Results', response);
			$scope.searchResults = response;
		}).catch((error) => {
			console.log('Nutrix Search Error', error);
		});
	};

	


	$scope.constructFoods = (ingredient, calories, fat, protein, sodium, sugars)=>{
		$scope.tempFood.title = ingredient;
		$scope.tempFood.calories = calories;
		$scope.tempFood.fat = fat;
		$scope.tempFood.protein = protein;
		$scope.tempFood.sodium = sodium;
		$scope.tempFood.sugars = sugars;
		$scope.tempFood.category = $scope.activeMenu;
		$scope.tempFood.date = $scope.date;
		$scope.newDiary.uid = $rootScope.user.uid;

		addNewFood($scope.tempFood);
	};


	// 	//checks firebase for existing diaries
	// 	// let ref = firebase.database().ref(`/meals`);
	// 	console.log('existing diaries', $scope.existingDiaries);

	// 	$scope.existingDiaries.forEach(function(diary){
	// 		console.log("existing diary uid", diary.uid);
	// 		if(diary.uid === $rootScope.user.uid){
	// 			console.log("existing diary date", diary.date);
	// 			if(diary.date === $scope.newDiary.date){
	// 				console.log("existing diary category", diary.category);
	// 				if(diary.category === $scope.newDiary.category){
	// 					console.log("meal id", diary.id);
	// 					$scope.mealId = diary.id;
	// 				}
	// 			}
	// 		}
	// 	});

	// 		console.log('mealId', $scope.mealId);

	// 		if ($scope.mealId !== undefined){
	// 			console.log('mealId', $scope.mealId);
	// 			DiaryFactory.getSingleDiary($scope.mealId).then(function(FbDiary) {

	// 				console.log('single diary: ', FbDiary);

	// 				let diary = FbDiary;

	// 				diary.id = $scope.mealId;

	// 				console.log('ingredients', diary.ingredients);

	// 				let ingredientsArray = diary.ingredients.split('/');

	// 				console.log('ingredientsArray', ingredientsArray);	

	// 				ingredientsArray.push(` ${$scope.tempDiary.ingredient} /`);

	// 				console.log('new ingredientsArray', ingredientsArray);

	// 				diary.ingredients = ingredientsArray.join('/');

	// 				console.log('diary.ingredients', diary.ingredients);

	// 				diary.totalCalories += $scope.tempDiary.calories;

	// 				diary.totalFat += $scope.tempDiary.fat;

	// 				diary.totalProtein += $scope.tempDiary.protein;

	// 				diary.totalSodium += $scope.tempDiary.sodium;

	// 				diary.totalSugars += $scope.tempDiary.sugars;

	// 				return diary;

	// 			}).then(function(diary){

	// 				console.log('diary object to add: ', diary);

	// 				DiaryFactory.editDiary(diary).then(function(response){
	// 					$location.url("/diary");
	// 					$scope.newDiary = {};
	// 				});

	// 			});
	// 		}else{
	// 			addNewDiary($scope.tempDiary);
	// 		}
	// 	// });
	// };


	let addNewFood= function(tempFood){

		$scope.newDiary.calories = tempFood.calories;
		$scope.newDiary.fat = tempFood.fat;
		$scope.newDiary.protein = tempFood.protein;
		$scope.newDiary.sugars = tempFood.sugars;
		$scope.newDiary.sodium = tempFood.sodium;
		$scope.newDiary.title = tempFood.title;
		$scope.newDiary.category = tempFood.category;
	    $scope.newDiary.date = tempFood.date;
	    $scope.newDiary.mealId = $scope.mealId;
	    $scope.newDiary.uid = $rootScope.user.uid;

		console.log('new food object to post or put', $scope.newDiary);
		FoodFactory.postFood($scope.newDiary).then((foodId)=>{
			console.log("new foodId: ", foodId);
			$scope.newDiary = {};
		});
	};	
});




