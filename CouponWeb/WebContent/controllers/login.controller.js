/**
 * Created by Avi on 07/10/2016.
 */
angular.module("Coupon")
    .controller("loginController", function ($scope, $rootScope, $http, $location, loginProxy, couponUtil) {
        $scope.clientType = "Customer";
        $scope.name = '';
        $scope.password = '';
        $scope.loginStatusShow = false;

        $scope.mySubmit = function () {
            if (($scope.name.length > 0 ) && ($scope.password.length > 0)) {
                loginProxy.login($scope.name, $scope.password, $scope.clientType)
                    .then(
                        function successCallback(response) {
                            if (response.data == "false") {
                                $scope.loginStatus = "Username or Password are incorrect";
                                $scope.loginStatusShow = true;
                            } else {
                                // share the client type between controllers
                                $rootScope.clientType = $scope.clientType;
                                // redirect to relevant client type home page
                                $location.path("/" + $scope.clientType.toLocaleLowerCase() + "home").replace();
                            }
                        },
                        function errorCallback(response) {
                            couponUtil.handleBadResponse('ERROR:', response);
                        }
                    );
            }
        }
    });
