angular.module("Coupon")
    .controller("adminhomeController", function ($scope, $http, $rootScope, couponUtil, companyProxy, companyFactory) {
        $scope.serverURL = "CouponWeb/coupon/admin";
        $scope.clientType = $rootScope.clientType;

        // Companies model array
        $scope.companies = [];

        // Get all companies
        $scope.getAllCompanies = function () {
            companyProxy.getAll()
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
           companyProxy.remove($scope.companies[index])
               .then(
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

        // Add/Update company (presest)
        $scope.addUpdateCompany = function (data, index) {
            if ($scope.companies[index].id == null) {
                // Add new company to db
              companyProxy.create(data).then(
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
               companyProxy.update($scope.companies[index].id, data).then(
                    function successCallback(response) {
                        logResponse('Company updated', response);
                        // update model
                        $scope.companies[index] = response.data;
                    },
                    function errorCallback(response) {
                        logResponse('ERROR:', response);
                    });
            }
        }


        // Todo: move validations to service
        $scope.onberofesavePASSWORD = function (data) {
            return couponUtil.passwordValidation(data);
        }

        // Add ROW for new company
        $scope.addRowForCompany = function () {
        };
        $scope.companies.push(companyFactory());
    });