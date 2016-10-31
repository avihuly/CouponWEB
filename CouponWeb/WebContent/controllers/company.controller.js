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

        // coupon update validation method
        $scope.onberofesaveCouponTitle = function (data) {
            var coupTitle = [];
            for (var i = 0; i < $scope.coupons.length; i++) {
                coupTitle.push($scope.coupons[i].title);
            }
            return couponUtil.nameValidation(data, coupTitle);
        };
        $scope.onberofesaveEndDate = function (data) {
            return couponUtil.dateValidation(data);
        }

        ////////////
        // COUPON //
        ////////////
        // Get all coupons
        $scope.getAllCoupons = function () {
            companyCouponProxy.getAll()
                .then(
                    function successCallback(response) {
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
        // Add coupon
        $scope.addCoupon = function (data) {
            companyCouponProxy.create(data)
                .then(
                    function successCallback(response) {
                        logResponse('New coupon added to DB:', response);
                        // update model
                        $scope.coupons.push(response.data);
                    },
                    function errorCallback(response) {
                        logResponse('ERROR:', response);
                    });
        };
        // Update coupon
        $scope.updateCoupon = function (data, index) {
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
        };
        // TODO: getCouponsByID
        // TODO: getCouponsByType
        // TODO: getCouponByPrice
        // TODO: getCouponStartDate
        // TODO: getCouponEndDate

        ///////////////
        //New Coupon //
        ///////////////


        $scope.generateCouponTemplate = function () {
            $scope.couponTemplate = couponFactory();
            $scope.couponTemplate.startDate = new Date;
            $scope.couponTemplate.endDate = new Date;
        }
        $scope.types = ["RESTAURANT", "ELECTRICITY", "FOOD", "HEALTH",
            "SPORTS", "CAMPING", "TRAVELLING"];


    });