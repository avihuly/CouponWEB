/**
 * Created by Avi on 07/10/2016.
 */
angular.module("Coupon")
    .controller("adminhomeController", function ($scope, $http, $rootScope) {
        $scope.serverURL = "http://localhost:8080/CouponWeb/coupon/admin/";
        $scope.clientType = $rootScope.clientType;

        $scope.companies = [];

        $scope.getAllCompanies = function () {
            $http
                .get($scope.serverURL+"getAllCompanies")
                .success(function (data) {
                    $scope.companies = data;
                })
        }


    });
