"use strict";


app.factory("PinFactory", function($q, $http, FIREBASE_CONFIG){

	var getFoodsFB = function(userId){
		return $q((resolve, reject)=>{
			$http.get(`${FIREBASE_CONFIG.databaseURL}/foods.json?orderBy="uid"&equalTo="${userId}"`)
			 .success( (response)=>{
			 	let pins = [];
			 	Object.keys(response).forEach((key)=>{
			 		response[key].id = key;
			 		pins.push(response[key]);
			 	});
			 	resolve(pins);
			 })
			 .error( (errorResponse)=>{
			 	reject(errorResponse);
			 });
		});
	};

	var postFood = function(postFood){
		return $q((resolve, reject)=>{
			$http.post(`${FIREBASE_CONFIG.databaseURL}/foods.json`, JSON.stringify({
				mealId: postFood.mealId,
				uid: postFood.uid,
				title: postFood.title,
				calories: postFood.calories,
				fat: postFood.fat,
				protein: postFood.protein,
				sodium: postFood.sodium,
				sugars: postFood.sugars
				})
			)
			 .success( (postResponse)=>{
			 	resolve(postResponse);
			 })
			 .error( (errorResponse)=>{
			 	reject(errorResponse);
			 });
		});
	};

	var deleteFood = function(foodId){
		return $q((resolve, reject)=>{
			$http.delete(`${FIREBASE_CONFIG.databaseURL}/foods/${foodId}.json`)
			 .success( (deleteReponse)=>{
			 	resolve(deleteReponse);
			 })
			 .error( (deleteError)=>{
			 	reject(deleteError);
			 });
		});
	};

	return {getFoodsFB: getFoodsFB,
			postFood: postFood,
			deleteFood: deleteFood};
});