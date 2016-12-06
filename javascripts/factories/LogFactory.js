"use strict";


app.factory("LogFactory", function($q, $http, FIREBASE_CONFIG){

	var getLogs = function(diaryId){
		return $q((resolve, reject)=>{
			$http.get(`${FIREBASE_CONFIG.databaseURL}/logs/${diaryId}.json`)
			 .success( (response)=>{
			 	// let logs = [];
			 	// Object.keys(response).forEach((key)=>{
			 	// 	response[key].id = key;
			 	// 	logs.push(response[key]);
			 	// });
			 	resolve(response);
			 })
			 .error( (errorResponse)=>{
			 	reject(errorResponse);
			 });
		});
	};
	return {
		getLogs: getLogs
	};


// 	var postPin = function(postPin){
// 		return $q((resolve, reject)=>{
// 			$http.post(`${FIREBASE_CONFIG.databaseURL}/pins.json`, JSON.stringify({
// 				boardId: postPin.boardId,
// 				title: postPin.title,
// 				uid: postPin.uid,
// 				url: postPin.url
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

// 	var deletePin = function(pinId){
// 		return $q((resolve, reject)=>{
// 			$http.delete(`${FIREBASE_CONFIG.databaseURL}/pins/${pinId}.json`)
// 			 .success( (deleteReponse)=>{
// 			 	resolve(deleteReponse);
// 			 })
// 			 .error( (deleteError)=>{
// 			 	reject(deleteError);
// 			 });
// 		});
// 	};

// 	return {getPinsFB: getPinsFB,
// 			postPin: postPin,
// 			deletePin: deletePin};
});