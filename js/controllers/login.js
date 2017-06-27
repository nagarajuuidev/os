angular.module('newapp')
.controller('LoginCtrl', function ($scope,$http,$location) { 
$scope.redirect = function (session){
console.log(session);	
$http.post("http://45.113.136.146:7070/onesevenhome/login.", session)
.then(function(resp) {
	$location.path('/dashboard'); 
 }); 
 };
   $http.get("http://45.113.136.146:7070/shop/getCategories").then(function(resp) {
	   console.log(resp);
	   $scope.menuitem=resp.data.categoryData;		
		});	
		
		angular.module('newapp')
  .controller('RegistrationCtrl', function ($scope,$http,$location) {
 $scope.redirect=function(user){
	 console.log(user);
	
	 $http.post("http://45.113.136.146:7070/onesevenhome/user", user).
	 then(function(resp) {  console.log(resp) 
	 });
	 
 }
  });
 });