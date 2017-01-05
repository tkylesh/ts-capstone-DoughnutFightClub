
"use strict";


app.factory("NutrixFactory",function($q, $http, FIREBASE_CONFIG, NUTRITIONIXAPIKEY){

	let ingredientList = (searchText) =>{
		return $q((resolve,reject) =>{
			$http({
				method: 'GET',
				url:`https://trackapi.nutritionix.com/v2/search/instant?query=${searchText}`,
				headers:{
					"x-app-Id":"e9bfed54",
					"x-app-key":"8f291f15c2b4327bb1b83d321d95d4da",
					"Content-Type":"application/json"
				}
			}).then((response) => {
				console.log('ntx response: ', response);
				resolve(response);
			}, (error)=>{
				console.log('ntx error: ', error);
				reject(error);
			});
		});
	};

	let getImages = (searchObject)=> {
		return $q((resolve,reject) =>{
			$http({
				method: 'Post',
				url:`https://trackapi.nutritionix.com/v2/natural/nutrients?{
					  "query": ${searchObject.item_name},
					  "num_servings": 1,
					  "aggregate": "string",
					  "line_delimited": false,
					  "timezone": "US/Eastern",
					  "consumed_at": null,
					  "lat": null,
					  "lng": null,
					  "meal_type": 0
					}`,
				headers:{
					"x-app-Id":"e9bfed54",
					"x-app-key":"8f291f15c2b4327bb1b83d321d95d4da",
					"x-remote-user-id":"0",
					"Content-Type":"application/json"
				}
			}).then((response) => {
				console.log('get Image response: ', response);
				resolve(response);
			}, (error)=>{
				console.log('get Image error: ', error);
				reject(error);
			});
		});
	};

	let getNutrients = (foodId) => {
		let authPart =`appId=${NUTRITIONIXAPIKEY.appId}&appKey=${NUTRITIONIXAPIKEY.appKey}`;
		let filter = 'fields=item_name,item_id,brand_name,brand_id,item_type,nf_calories,nf_total_carbohydrate,nf_dietary_fiber,nf_cholesterol,nf_total_fat,nf_sugars,nf_sodium,nf_protein,images_front_full_url,nf_serving_size_qty,nf_serving_size_unit,nf_servings_per_container';
		// let sort = 'sort: {"field":"_score", "order":"desc"}';
		// let typefilter = '"filters":{"not": {"item_type":3}}';
				
		return $q((resolve,reject) =>{
			$http({
				method:'GET',
				url:`https://api.nutritionix.com/v1_1/item?id=${foodId}&${authPart}`
			}).success((response)=>{
				console.log('nutrix response nutrients request', response);
				resolve(response);
			}).error((errorResponse)=>{
				console.log('nutrix fail nutrients request', errorResponse);
				resolve(errorResponse);
			});
		});
	};

	let getCommonNutrients = (searchText) =>{
		return (
			$q((resolve,reject) =>{

				let authPart =`appId=${NUTRITIONIXAPIKEY.appId}&appKey=${NUTRITIONIXAPIKEY.appKey}`;
				let filter = 'fields=item_name,item_id,brand_name,brand_id,item_type,nf_calories,nf_total_carbohydrate,nf_dietary_fiber,nf_cholesterol,nf_total_fat,nf_sugars,nf_sodium,nf_protein,images_front_full_url,nf_serving_size_qty,nf_serving_size_unit,nf_servings_per_container';

					$http.get(`https://api.nutritionix.com/v1_1/search/${searchText}?${filter}&${authPart}&"limit"="1"&"offset"="0"&"sort"={"field": "nf_calories","order": "desc"}`)
						.success( (response) => {
						console.log('nutrix response', response);
						resolve(response.hits);
					}).error(function(errorResponse){
						console.log('nutrix fail', errorResponse);
						reject(errorResponse);
					});
				
			})
		);
	};

	return {ingredientList: ingredientList, getNutrients: getNutrients, getCommonNutrients: getCommonNutrients, getImages:getImages};
});
