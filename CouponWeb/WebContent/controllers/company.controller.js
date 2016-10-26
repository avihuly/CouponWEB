angular.module("Coupon")
    .controller("companyController", function
        ($scope, $http, $rootScope, couponUtil,
         loginProxy, companyCouponProxy, couponFactory) {

        // Coupons model array
        $scope.coupons = [];
        // Search text
        $scope.searchText = '';
        // client Type
        $scope.clientType = $rootScope.clientType;
        // sidebar navigation click model
        $scope.sideBarRadioClickModel = "views/companyCoupon.view.html";

        // password validation method //TODO: ask danny if to move and how?
        $scope.onberofesavePASSWORD = function (data) {
            return couponUtil.passwordValidation(data);
        };

        // coupon validation method
        $scope.onberofesaveCouponTitle = function (data) {
            var coupTitle = [];
            for (var i = 0; i < $scope.coupons.length; i++) {
            	coupTitle.push($scope.coupons[i].title);
            }
            return couponUtil.usernameValidation(data, coupTitle);
        };


        /////////////
        // COUPON //
        /////////////
        // Get all coupons
        $scope.getAllCoupons = function () {
        	companyCouponProxy.getAll()
                .then(
                    function successCallback(response) {
                       console.debug(response.data);
                    	$scope.coupons = response.data;
                    },
                    function errorCallback(response) {
                        logResponse('ERROR:', response);
                    });
        };

        // Remove coupon
        $scope.removeCoupon = function (index) {
            companyCouponProxy.remove($scope.coupons[index].id)
                .then(
                    function successCallback(response) {
                        console.log('DELETED:');
                        console.log(response.data);
                        // Delete coupon from model
                        $scope.coupons.splice(index, 1);
                    },
                    function errorCallback(response) {
                        logResponse('ERROR:', response);
                    });
        };

        // Add/Update coupon (presest)
        //TODO: update is limited to End date and price
        $scope.addUpdateCoupon = function (data, index) {
           
        	if ($scope.coupons[index].id == null) {
                // Add new company to db
                companyCouponProxy.create(data)
                    .then(
                        function successCallback(response) {
                            logResponse('New coupon added to DB:', response);
                            // update model
                            $scope.coupons[index] = response.data;
                        },
                        function errorCallback(response) {
                            logResponse('ERROR:', response);
                        });
            } else {
                // Update coupon in DB
                companyCouponProxy.update($scope.coupons[index].id, data)
                .then(
                    function successCallback(response) {
                        logResponse('Coupon updated', response);
                        // update model
                        $scope.coupons[index] = response.data;
                    },
                    function errorCallback(response) {
                        logResponse('ERROR:', response);
                    });
            }
        };

        // Add ROW for new coupon
        $scope.addRowForCoupon = function () {
            $scope.coupons.push(couponFactory());
        };

        // TODO: getCouponsByID
     // TODO: getCouponsByType
     // TODO: getCouponByPrice
     // TODO: getCouponStartDate
     // TODO: getCouponEndDate

    });