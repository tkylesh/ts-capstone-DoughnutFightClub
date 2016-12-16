"use strict";

app.service('MealIdService',function($q, $http, $rootScope){

	this.FoodData ={uid: $rootScope.user.uid};

	this.setMealId = (mealId) => {
		this.FoodData.mealId = mealId;
	};

	this.getMealId = () => {
		return this.FoodData.mealId;
	};

});