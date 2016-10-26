/**
 * Created by Avi on 07/10/2016.
 */
angular.module("Coupon")
    .controller("loginController", function ($scope, $rootScope, $http, $location, loginProxy) {
        $scope.clientType = "Company";
        $scope.name = "a";
        $scope.password = "1";
        
        $scope.mySubmit = function () {
            loginProxy.login($scope.name, $scope.password, $scope.clientType)
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
