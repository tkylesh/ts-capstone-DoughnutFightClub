"use strict";

app.service('MealIdService',function($q, $http, $rootScope){

	this.FoodData ={uid: $rootScope.user.uid};


	//mealId methods
	this.setMealId = (mealId) => {
		this.FoodData.mealId = mealId;
	};

	this.getMealId = () => {
		return this.FoodData.mealId;
	};

	this.clearMealId = () => {
		this.FoodData.mealId = null;
	};


	//get diary dates (DiaryCtrl.js).
	this.setActiveDate = (date) => {
		this.FoodData.date = date;
	};

	this.getActiveDate = () => {
		return this.FoodData.date;
	};

	this.clearActiveDate = () => {
		this.FoodData.date = null;
	};

	//Edit diary dates (SearchCtrl.js).
	this.setEditDate = (date) => {
		this.FoodData.editDate = date;
	};
	this.getEditDate = () => {
		return this.FoodData.editDate;
	};

	this.clearEditDate = () => {
		this.FoodData.editDate = null;
	};
});