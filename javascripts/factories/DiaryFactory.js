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

	//this query doesn't work. ask someone about it.
	// var getDiaryByDate = function(userId, date){
	// 	return $q((resolve, reject)=>{
	// 		$http.get(`${FIREBASE_CONFIG.databaseURL}/meals.json?orderBy="uid"&equalTo="${userId}&"date"="${date}"`)
	// 		.success( (response)=>{
	// 		 	let diaries=[];
	// 		 	Object.keys(response).forEach((key)=>{
	// 		 		response[key].id = key;
	// 		 		diaries.push(response[key]);
	// 		 	});
	// 		 	resolve(diaries);
	// 		 })
	// 		 .error( (errorResponse)=>{
	// 		 	reject(errorResponse);
	// 		 });
	// 	});
	// };

	//Firebase: send a new item to Firebase
	var postNewDiary = function(newDiary){
		return $q((resolve, reject)=>{
			$http.post(`${FIREBASE_CONFIG.databaseURL}/meals.json`, JSON.stringify({
				uid: newDiary.uid,
				date: newDiary.date,
				category: newDiary.category,
				ingredients: newDiary.ingredients,
				totalCalories: newDiary.totalCalories,
				totalFat: newDiary.totalFat,
				totalProtein: newDiary.totalProtein,
				totalSodium: newDiary.totalSodium,
				totalSugars: newDiary.totalSugars
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
		postNewDiary:postNewDiary,
		getSingleDiary:getSingleDiary
	};
});



// 	//Firebase: send a new item to Firebase
// 	var postNewBoard = function(newBoard){
// 		return $q((resolve, reject)=>{
// 			$http.post(`${FIREBASE_CONFIG.databaseURL}/boards.json`, JSON.stringify({
// 				boardTitle: newBoard.boardTitle,
// 				uid: newBoard.uid
// 				})
// 			)
// 			 .success( (postResponse)=>{
// 			 	resolve(postResponse);
// 			 })
// 			 .error( (errorResponse)=>{
// 			 	reject(errorResponse);
// 			 });
// 		});
// 	};
// 	var deleteBoard = function(boardId){
// 		return $q((resolve, reject)=>{
// 			$http.delete(`${FIREBASE_CONFIG.databaseURL}/boards/${boardId}.json`)
// 			 .success( (deleteReponse)=>{
// 			 	resolve(deleteReponse);
// 			 })
// 			 .error( (deleteError)=>{
// 			 	reject(deleteError);
// 			 });
// 		});
// 	};
// 	var getSingleBoard = function(boardId){
// 		return $q((resolve, reject)=>{
// 			$http.get(`${FIREBASE_CONFIG.databaseURL}/boards/${boardId}.json`)
// 			 .success( (getSingleReponse)=>{
// 			 	resolve(getSingleReponse);
// 			 })
// 			 .error( (getSingleError)=>{
// 			 	reject(getSingleError);
// 			 });
// 		});
// 	};
// 	var editBoard = function(editBoard){
// 		return $q((resolve, reject)=>{
// 			$http.put(`${FIREBASE_CONFIG.databaseURL}/boards/${editBoard.id}.json`, 
// 				JSON.stringify({
// 					boardTitle: editBoard.boardTitle,
// 					uid: editBoard.uid
// 				})
// 			)
// 			 .success( (editResponse)=>{
// 			 	resolve(editResponse);
// 			 })
// 			 .error( (errorResponse)=>{
// 			 	reject(errorResponse);
// 			 });
// 		});
// 	};
// 	return {getBoardList:getBoardList, postNewBoard:postNewBoard, deleteBoard:deleteBoard, getSingleBoard:getSingleBoard, editBoard: editBoard};
// });