"use strict";

app.controller("NewMealCtrl", function($scope, $rootScope, $location, DiaryFactory, FoodFactory){

	//take all functionality that creates new meals out of search controller and put in this controller.
	//All meals will now be created from the new meal page.
	//activate the google materialize modal
	$('.modal').modal();
	$('#modal1').modal('open');

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

	

	//Set the Meal category to active when a link is clicked
	$scope.menuItems = ['BREAKFAST', 'LUNCH', 'DINNER', 'SNACKS'];
	$scope.activeMenu = $scope.menuItems[0];

	$scope.setActive = function(menuItem) {
	    $scope.activeMenu = menuItem;
	    console.log("meal category: ", $scope.activeMenu);
	    // $scope.newDiary.category = $scope.activeMenu;
	    // $scope.newDiary.date = getDate();
	    // console.log('$scope.newDiary.category ', $scope.newDiary.category);
	    // console.log('$scope.newDiary.date', getDate());
	    $('#modal1').modal('close');
	};
});