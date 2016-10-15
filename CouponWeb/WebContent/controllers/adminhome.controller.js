angular.module("Coupon")
    .controller("adminhomeController", function
        ($scope, $http, $rootScope, couponUtil,
         loginProxy, companyProxy, customerProxy,
         companyFactory, customerFactory) {

        // Companies model array
        $scope.companies = [];
        // customer model array
        $scope.customers = [];
        // Search text
        $scope.searchText = '';
        // client Type
        $scope.clientType = $rootScope.clientType;
        // sidebar navigation click model
        $scope.sideBarRadioClickModel = "views/adminCompany.view.html";

        // password validation method //TODO: ask danny if to move and how?
        $scope.onberofesavePASSWORD = function (data) {
            return couponUtil.passwordValidation(data);
        }

        // company validation method
        $scope.onberofesaveCompanyName = function (data) {
            var compNames = [];
            for (var i = 0; i < $scope.companies.length; i++) {
                compNames.push($scope.companies[i].compName);
            }
            return couponUtil.usernameValidation(data, compNames);
        }

        // customer validation method
        $scope.onberofesaveCustomerName = function (data) {
            var custNames = [];
            for (var i = 0; i < $scope.customers.length; i++) {
                custNames.push($scope.customers[i].custName);
            }
            return couponUtil.usernameValidation(data, custNames);
        }

        // Clear Search Text
        $scope.ClearSearchText = function () {
            $scope.searchText = '';
        }


        /////////////
        // COMPANY //
        /////////////
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
            companyProxy.remove($scope.companies[index].id)
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
                companyProxy.create(data)
                    .then(
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

        // Add ROW for new company
        $scope.addRowForCompany = function () {
            $scope.companies.push(companyFactory());
        };

        // Get all company coupons
        $scope.getCompanyCoupons = function (id, index) {
            companyProxy.getCoupons(id)
                .then(
                    function successCallback(response) {
                        console.debug('COUPONS:',response.data);

                        for (var i=0; i < response.data.length ; i++) {
                            console.debug(response.data[i]);
                        }


                        $scope.companies[index].coupons = response.data;
                    },
                    function errorCallback(response) {
                        logResponse('ERROR:', response);
                    });
        }


        //////////////
        // CUSTOMER //
        //////////////
        // Get all customers
        $scope.getAllCustomers = function () {
            customerProxy.getAll()
                .then(
                    function successCallback(response) {
                        $scope.customers = response.data;
                    },
                    function errorCallback(response) {
                        logResponse('ERROR:', response);
                    });
        };

        // Remove customer
        $scope.removeCustomer = function (index) {
            console.log(index);
            customerProxy.remove($scope.customers[index].id)
                .then(
                    function successCallback(response) {
                        console.log('DELETED:');
                        console.log(response.data);
                        // Delete comapny from model
                        $scope.customers.splice(index, 1);
                    },
                    function errorCallback(response) {
                        logResponse('ERROR:', response);
                    });
        };

        // Add/Update customer (presest)
        $scope.addUpdateCustomer = function (data, index) {
            if ($scope.customers[index].id == null) {
                // Add new company to db
                customerProxy.create(data).then(
                    function successCallback(response) {
                        logResponse('New company added to DB:', response);
                        // update model
                        $scope.customers[index] = response.data;
                    },
                    function errorCallback(response) {
                        logResponse('ERROR:', response);
                    });
            } else {
                // Update customer in DB
                customerProxy.update($scope.customers[index].id, data).then(
                    function successCallback(response) {
                        logResponse('Company updated', response);
                        // update model
                        $scope.customers[index] = response.data;
                    },
                    function errorCallback(response) {
                        logResponse('ERROR:', response);
                    });
            }
        }

        // Add ROW for new company
        $scope.addRowForCompany = function () {
            $scope.companies.push(customerFactory());
        };

        // Get all customer coupons
        $scope.getCustomerCoupons = function (id) {
            customerProxy.getCoupons(id)
                .then(
                    function successCallback(response) {
                        console.debug('customer COUPONS:',response.data);
                        $scope.customers[index].coupons = response.data;
                    },
                    function errorCallback(response) {
                        logResponse('ERROR:', response);
                    });
        }
    });