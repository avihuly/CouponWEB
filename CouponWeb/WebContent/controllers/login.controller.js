/**
 * Created by Avi on 07/10/2016.
 */
angular.module("Coupon")
    .controller("loginController", function ($scope, $rootScope, $http, $location) {
        $scope.clientType = "Admin";
        $scope.name = "0";
        $scope.password = "0";
        
        $scope.mySubmit = function () {
            // TODO: move http request to a new proxy service - loginProxy.service.js
            $http
                .get("http://localhost:8080/CouponWeb/coupon/login/"+$scope.name+"/"+$scope.password+"/"+$scope.clientType)
                .success(function (loginStatus) {
                    if(loginStatus == "false") {
                        $scope.loginStatus = "username or password is incorrect" ;
                    } else {
                        // share the client type between controllers
                        $rootScope.clientType = $scope.clientType;
                        // redirect to relevant client type home page
                        $location.path("/"+$scope.clientType.toLocaleLowerCase()+"home").replace();
                    }
                })
        }
    });
