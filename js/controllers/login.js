angular.module('newapp')
    .controller('LoginCtrl', function($scope, $http, $location, $route) {
            $scope.redirect = function(session) {
                console.log(session);
                $http.post("http://45.113.136.146:7070/shop/user/login", session)
                    .then(function(resp) {
						
                        if (resp.data.success == true) {
							localStorage.setItem("loggedInUser",session.userName );
							console.log(localStorage.getItem("loggedInUser"));
                            $location.path('/');
                        } else {
                            alert(resp.data.errorMessage);
                            $scope.errmessage = resp.data.errorMessage
                        }
                    });
			    }
       
			
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
        })
    