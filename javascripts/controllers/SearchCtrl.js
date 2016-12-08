"use strict";

app.controller("SearchCtrl", function($scope, $rootScope, $location, NutrixFactory, DiaryFactory){
	$scope.searchNutrix= '';
	$scope.searchResults = [];
	$scope.newDiary = {};

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
		$scope.newDiary.uid = $rootScope.user.uid;
		$scope.newDiary.date = getDate();
		DiaryFactory.postNewDiary($scope.newDiary).then(function(diaryId){
			$location.url("/diary");
			$scope.newDiary = {};
		});
	};
});