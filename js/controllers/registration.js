angular.module('newapp') 
  .controller('RegistrationCtrl', function ($scope,$http,$location,$route) {   
	$http.get("http://45.113.136.146:7070/shop/getAllCategories").then(function(resp) {
            console.log(resp);
            $scope.menuitem = resp.data.categoryData;
        });
        $scope.mouseOver = function(param) {
            $scope.set_bg = function() {
                $scope.bgimg = param.imageURL;
                return {
                    "background-image": "url(/clients/oneseven_home_v2/img/" + $scope.bgimg + ".jpg)"
                };
            }
        }
$scope.register = function (user) {
	console.log(user);	
	var userlog={
		"emailAddress": user.emailAddress,
		"billing": {
			"firstName": user.firstName,
			"lastName": user.lastName,
			"company": "",
			"phone": user.phone,
			"address": user.address,
			"city": user.city,
			"postalCode":user.postalCode,
			"stateProvince": user.stateProvince,
			"country": "IN"
		},
		"userName": user.emailAddress,
		"password": user.password,
		"checkPassword": user.checkPassword
	}
	$http.post("http://45.113.136.146:7070/shop/customer/user/register", userlog)
		.then(function(resp) {
		console.log(resp)
		$route.reload();
		//$location.path('/login'); 
	});
  };
});