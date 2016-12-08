"use strict";

app.controller("SearchCtrl", function($scope, $rootScope, $location, NutrixFactory, DiaryFactory, FIREBASE_CONFIG){
	$scope.searchNutrix= '';
	$scope.searchResults = [];
	$scope.newDiary = {};
	$scope.tempDiary = {};
	$scope.tempTitleArray = [];




	//checks firebase for existing ingredients list
	let ref = firebase.database().ref(`/meals`);

	ref.on("value", function(snapshot) {
		console.log('snapshot: ', snapshot.exportVal());
		snapshot.forEach(function(childSnapshot) {
			if (childSnapshot.hasChild('ingredients')){
				let location = childSnapshot.ref;
				console.log('diary at '+location+' has ingredients list already ("'+childSnapshot.val().ingredients+'").');
			}
			childSnapshot.forEach(function(childofchildSnapshot){
				console.log('childSnapshot', childSnapshot.key);
				console.log('key: ', childofchildSnapshot.key, ' / value: ', childofchildSnapshot.val());

			});
		});
	});




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

	


	let uid = $rootScope.user.uid;

	$scope.NutrixSearch = function(){
		NutrixFactory.ingredientList($scope.searchNutrix).then(function(response){
			console.log('Nutrix Search Results', response);
			$scope.searchResults = response;
		}).catch((error) => {
			console.log('Nutrix Search Error', error);
		});
	};



	$scope.addNewDiary = function(){
		console.log('tempdiary cals', $scope.tempDiary.calories);
		$scope.tempTitleArray.push($scope.tempDiary.title);

		$scope.newDiary.uid = $rootScope.user.uid;
		$scope.newDiary.date = getDate();
		$scope.newDiary.totalCalories = $scope.tempDiary.calories;
		$scope.newDiary.totalFat = $scope.tempDiary.fat;
		$scope.newDiary.totalProtein = $scope.tempDiary.protein;
		$scope.newDiary.totalSugars = $scope.tempDiary.sugars;
		$scope.newDiary.totalSodium = $scope.tempDiary.sodium;
		$scope.newDiary.ingredients = $scope.tempTitleArray.join();

		console.log('new meal to post: ', $scope.newDiary);

		DiaryFactory.postNewDiary($scope.newDiary).then(function(diaryId){
			$location.url("/diary");
			$scope.newDiary = {};
		});
	};
});