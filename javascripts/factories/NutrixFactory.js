
"use strict";


app.factory("NutrixFactory",function($q, $http, FIREBASE_CONFIG, NUTRITIONIXAPIKEY){

	let ingredientList = (searchText) =>{
		return (
			$q((resolve,reject) =>{

				let authPart =`appId=${NUTRITIONIXAPIKEY.appId}&appKey=${NUTRITIONIXAPIKEY.appKey}`;
					$http.get(`https://api.nutritionix.com/v1_1/search/${searchText}?&${authPart}`)
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

	return {ingredientList: ingredientList};
});