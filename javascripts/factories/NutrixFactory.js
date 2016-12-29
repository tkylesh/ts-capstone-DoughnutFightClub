
"use strict";


app.factory("NutrixFactory",function($q, $http, FIREBASE_CONFIG, NUTRITIONIXAPIKEY){

	let ingredientList = (searchText) =>{
		return (
			$q((resolve,reject) =>{
				let authPart =`x-app-Id=${NUTRITIONIXAPIKEY.appId}&x-app-key=${NUTRITIONIXAPIKEY.appKey}&Content-Type:application/json`;

				$http.get('https://trackapi.nutritionix.com/v2/search/instant?query=${searchText}')
					.success( (response) => {
					console.log('nutrix response', response);
					// resolve(response.hits);
				}).error(function(errorResponse){
					console.log('nutrix fail', errorResponse);
					// reject(errorResponse);
				});


				// let authPart =`appId=${NUTRITIONIXAPIKEY.appId}&appKey=${NUTRITIONIXAPIKEY.appKey}`;
				// let filter = 'fields=item_name,item_id,brand_name,brand_id,item_type,nf_calories,nf_total_carbohydrate,nf_dietary_fiber,nf_cholesterol,nf_total_fat,nf_sugars,nf_sodium,nf_protein,images_front_full_url,nf_serving_size_qty,nf_serving_size_unit,nf_servings_per_container';
				// let sort = 'sort: {"field":"_score", "order":"desc"}';
				// // let typefilter = '"filters":{"not": {"item_type":3}}';
				
				// 	$http.get(`https://api.nutritionix.com/v1_1/search/${searchText}?${filter}&${sort}&${authPart}`)
					// 	.success( (response) => {
					// 	console.log('nutrix response', response);
					// 	resolve(response.hits);
					// }).error(function(errorResponse){
					// 	console.log('nutrix fail', errorResponse);
					// 	reject(errorResponse);
					// });
				
			})
		);
	};

	return {ingredientList: ingredientList};
});