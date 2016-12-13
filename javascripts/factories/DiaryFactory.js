"use strict";
app.factory("DiaryFactory", function($q, $http, FIREBASE_CONFIG){

		//Firebase: get all Items
	var getDiary = function(userId){
		return $q((resolve, reject)=>{
			$http.get(`${FIREBASE_CONFIG.databaseURL}/meals.json?orderBy="uid"&equalTo="${userId}"`)
			 .success( (response)=>{
			 	let diaries=[];
			 	Object.keys(response).forEach((key)=>{
			 		response[key].id = key;
			 		diaries.push(response[key]);
			 	});
			 	resolve(diaries);
			 })
			 .error( (errorResponse)=>{
			 	reject(errorResponse);
			 });
		});
	};

	var deleteDiary = function(diaryId){
		return $q((resolve, reject)=>{
			$http.delete(`${FIREBASE_CONFIG.databaseURL}/meals/${diaryId}.json`)
			 .success( (deleteReponse)=>{
			 	resolve(deleteReponse);
			 })
			 .error( (deleteError)=>{
			 	reject(deleteError);
			 });
		});
	};

	var getSingleDiary = function(diaryId){
	    return $q((resolve, reject) => {
	      $http.get(`${FIREBASE_CONFIG.databaseURL}/meals/${diaryId}.json`)
	      .success(function(getSingleResponse){
	        resolve(getSingleResponse);
	      })
	      .error(function(getSingleError){
	        reject(getSingleError);
	      });
	    });
  	};

	var editDiary = function(editDiary){
    return $q((resolve, reject) =>{
      $http.put(`${FIREBASE_CONFIG.databaseURL}/meals/${editDiary.id}.json`,
         JSON.stringify({
           	uid: editDiary.uid,
			date: editDiary.date,
			category: editDiary.category,
			ingredients: editDiary.ingredients,
			totalCalories: editDiary.totalCalories,
			totalFat: editDiary.totalFat,
			totalProtein: editDiary.totalProtein,
			totalSodium: editDiary.totalSodium,
			totalSugars: editDiary.totalSugars
         })
       )
        .success(function(editResponse){
          resolve(editResponse);
        })
        .error(function(editError){
          reject(editError);
        });
    });
  };

	//Firebase: send a new item to Firebase
	var postNewDiary = function(newDiary){
		return $q((resolve, reject)=>{
			$http.post(`${FIREBASE_CONFIG.databaseURL}/meals.json`, JSON.stringify({
				uid: newDiary.uid,
				date: newDiary.date,
				category: newDiary.category,
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

	return {
		getDiary:getDiary,
		deleteDiary:deleteDiary,
		postNewDiary:postNewDiary,
		getSingleDiary:getSingleDiary,
		editDiary:editDiary
	};
});