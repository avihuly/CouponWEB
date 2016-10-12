/**
 * Created by Avi on 07/10/2016.
 */
angular.module("Coupon")
    .controller("adminhomeController", function ($scope, $http, $rootScope, couponUtil) {
        $scope.serverURL = "http://localhost:8080/CouponWeb/coupon/admin";
        $scope.clientType = $rootScope.clientType;

        // Companies model array
        $scope.companies = [];

        // Get all companies
        $scope.getAllCompanies = function () {
            $http
                .get($scope.serverURL + "/getAllCompanies")
                .then(
                    function successCallback(response) {
                        $scope.companies = response.data;
                    },
                    function errorCallback(response) {
                        logResponse('ERROR:', response);
                    });
        };

        // Remove company
        $scope.removeCompany = function (index) {
            $http({
                method: 'Delete',
                url: $scope.serverURL + "/removeCompany",
                headers: {'Content-Type': 'text/plain'},
                data: $scope.companies[index].id
            }).then(
                function successCallback(response) {
                    console.log('DELETED:');
                    console.log(response.data);
                    // Delete comapny from model
                    $scope.companies.splice(index, 1);
                },
                function errorCallback(response) {
                    logResponse('ERROR:', response);
                });
        };

        // Add ROW for new company
        $scope.addRowForCompany = function () {
            $scope.companies.push({
                id: null,
                compName: '',
                password: '',
                email: ''
            });
        };

        // Add/Update company (presest)
        $scope.addUpdateCompany = function (data, index) {
            if ($scope.companies[index].id == null) {
                // Add new company to db
                var company = data;
                company.id = null;
                $http({
                    method: 'POST',
                    url: $scope.serverURL + "/createCompany",
                    headers: {'Content-Type': 'application/json'},
                    data: company
                }).then(
                    function successCallback(response) {
                        logResponse('New company added to DB:', response);
                        // update model
                        $scope.companies[index] = response.data;
                    },
                    function errorCallback(response) {
                        logResponse('ERROR:', response);
                    });
            } else {
                // Update company in DB
                var company = data;
                company.id = $scope.companies[index].id;
                $http({
                    method: 'POST',
                    url: $scope.serverURL + "/updateCompany",
                    headers: {'Content-Type': 'application/json'},
                    data: company
                }).then(
                    function successCallback(response) {
                        logResponse('Company update added to DB:', response);
                        // update model
                        $scope.companies[index] = response.data;
                    },
                    function errorCallback(response) {
                        logResponse('ERROR:', response);
                    });
            }
        }


        $scope.onberofesavePASSWORD = function (data) {
            return couponUtil.passwordValidation(data);
        }



    });