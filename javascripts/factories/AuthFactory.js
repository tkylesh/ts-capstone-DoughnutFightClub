"use strict";

app.factory("AuthFactory", function($q, $http, $rootScope, FIREBASE_CONFIG){

	var currentUserData = null;
	var isAuthenticated = function(){
		return firebase.auth().currentUser ? true : false;
	};
	var getUser = function(){
		return firebase.auth().currentUser;
	};
	var logout = function(){
		firebase.auth().signOut();
	};

	var authenticate = function(credentials){
		return $q((resolve, reject) => {
			firebase.auth().signInWithEmailAndPassword(
				credentials.email, 
				credentials.password)
			.then((authData) => {
				resolve(authData);
			}).catch((error) => {
				reject(error);
			});
		});
	};

	var registerWithEmail = function(user){
		return $q((resolve, reject) => {
			firebase.auth().createUserWithEmailAndPassword(
				user.email,
				user.password)
			.then((authData) => {
				resolve(authData);
			}).catch((error) => {
				reject(error);
			});
		});
	};

	return {
		isAuthenticated:isAuthenticated,
		getUser:getUser,
		logout:logout,
		authenticate:authenticate,
		registerWithEmail:registerWithEmail
	};

});