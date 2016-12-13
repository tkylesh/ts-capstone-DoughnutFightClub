"use strict";

app.controller("SearchCtrl", function($scope, $rootScope, $location, NutrixFactory, DiaryFactory, FIREBASE_CONFIG){
	$scope.searchNutrix= '';
	$scope.searchResults = [];
	$scope.newDiary = {};
	$scope.tempDiary = {};
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


	//getMeals
	// DiaryFactory.getDiary($rootScope.user.uid).then(function(FbDiaries) {
	// 	$scope.existingDiaries = FbDiaries;
	// 	console.log('existing diaries: ', $scope.existingDiaries);
	// });



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



	//activate the google materialize modal
	$('.modal').modal();
	$('#modal1').modal('open');

	//Set the Meal category to active when a link is clicked
	$scope.menuItems = ['BREAKFAST', 'LUNCH', 'DINNER', 'SNACKS'];
	$scope.activeMenu = $scope.menuItems[0];

	$scope.setActive = function(menuItem) {
	    $scope.activeMenu = menuItem;
	    $scope.newDiary.category = $scope.activeMenu;
	    console.log('$scope.newDiary.category ', $scope.newDiary.category);
	    console.log('$scope.newDiary.date', getDate());
	    $('#modal1').modal('close');
	};



	


	// let uid = $rootScope.user.uid;

	$scope.NutrixSearch = function(){
		NutrixFactory.ingredientList($scope.searchNutrix).then(function(response){
			console.log('Nutrix Search Results', response);
			$scope.searchResults = response;
		}).catch((error) => {
			console.log('Nutrix Search Error', error);
		});
	};



	$scope.constructDiary = (ingredient, calories, fat, protein, sodium, sugars)=>{
		$scope.tempDiary.ingredient = ingredient;
		$scope.tempDiary.calories = calories;
		$scope.tempDiary.fat = fat;
		$scope.tempDiary.protein = protein;
		$scope.tempDiary.sodium = sodium;
		$scope.tempDiary.sugars = sugars;


		$scope.newDiary.uid = $rootScope.user.uid;
		$scope.newDiary.date = getDate();
		console.log('things i need for to test', $scope.newDiary.uid, $scope.newDiary.date, $scope.newDiary.category);

		//checks firebase for existing diaries
		let ref = firebase.database().ref(`/meals`);

		ref.on("value", function(snapshot) {
			console.log('snapshot: ', snapshot.exportVal());
			snapshot.forEach(function(childSnapshot) {
				if (childSnapshot.child('uid').val() === $rootScope.user.uid){

					let location = childSnapshot.ref;
					console.log('diary at '+location+' is one of your meal logs.');

					if (childSnapshot.hasChild('ingredients')){
						let location = childSnapshot.ref;
						console.log('diary at '+location+' has ingredients list already ("'+childSnapshot.val().ingredients+'").');
					}

					console.log('childSnapshot', childSnapshot.key);
					childSnapshot.forEach(function(childofchildSnapshot){
					console.log('key: ', childofchildSnapshot.key, ' / value: ', childofchildSnapshot.val());
					});
				}
			});
		});
		
		DiaryFactory.getDiary($rootScope.user.uid).then(function(FbDiaries) {
			$scope.diaries = FbDiaries;
			console.log('diaries: ', $scope.diaries);
			let diary = $scope.diaries.filter(function(object){
			return object.uid === $rootScope.user.uid && object.date === $scope.newDiary.date && object.category === $scope.newDiary.category;
			});
			console.log('diary', diary);
			let ingredientsArray = diary.ingredients.split();
			console.log('ingredientsArray', ingredientsArray);	
			ingredientsArray.push($scope.tempDiary.ingredient);
			console.log('new ingredientsArray', ingredientsArray);
			diary.ingredients = ingredientsArray.join(', ');
			console.log('diary.ingredients', diary.ingredients);
			diary.totalCalories += $scope.tempDiary.calories;
			diary.totalFat += $scope.tempDiary.fat;
			diary.totalProtein += $scope.tempDiary.protein;
			diary.totalSodium += $scope.tempDiary.sodium;
			diary.totalSugars += $scope.tempDiary.sugars;
			return diary;
		}).then(function(diary){
			console.log('diary object to add: ', diary);
			addNewDiary(diary);
		});
	};


	let addNewDiary = function(tempDiary){
		console.log('tempdiary cals', tempDiary.calories);

		
		$scope.newDiary.totalCalories = tempDiary.calories;
		$scope.newDiary.totalFat = tempDiary.fat;
		$scope.newDiary.totalProtein = tempDiary.protein;
		$scope.newDiary.totalSugars = tempDiary.sugars;
		$scope.newDiary.totalSodium = tempDiary.sodium;
		$scope.newDiary.ingredients = tempDiary.ingredient;

		console.log('new meal to post: ', $scope.newDiary);



		DiaryFactory.postNewDiary($scope.newDiary).then(function(diaryId){
			$location.url("/diary");
			$scope.newDiary = {};
		});
	};
});