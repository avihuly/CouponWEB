angular.module("Coupon")
    .controller("companyController", function
        ($scope, $http, $rootScope, couponUtil,
         loginProxy, companyCouponProxy, couponFactory,
         couponTypesFactory, couponFilterFactory) {

        // Coupons model array
        $scope.coupons = [];
        // Search text
        $scope.searchText = '';
        // client Type
        $scope.clientType = $rootScope.clientType;
        // Sidebar navigation click model
        $scope.sideBarRadioClickModel = "views/companyCoupon.view.html";
        // Coupon types
        $scope.couponType = couponTypesFactory;
        // Filter model
        $scope.couponFilter = couponFilterFactory();

        //////////////////////
        // Validation method//
        //////////////////////
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
            $scope.couponFilter = couponFilterFactory();
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
            console.debug($scope.couponTemplate);
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
        // Get coupon by type
        $scope.byType = function () {
            var index = document.getElementById("typeSelect").selectedIndex;
            var typeOptions = document.getElementById("typeSelect").options;
            $scope.couponFilter.typeOnfocus = typeOptions[index].text;

            if ($scope.couponFilter.typeOnfocus == "All") {
                $scope.getAllCoupons();
            } else {
                companyCouponProxy.byType($scope.couponFilter.typeOnfocus)
                    .then(
                        function successCallback(response) {
                            $scope.coupons = response.data;
                            if ($scope.coupons == '') {
                                $scope.couponFilter.message =
                                    "No coupons of type '" + $scope.couponFilter.typeOnfocus + "'";
                            } else {
                                $scope.couponFilter.message = '';
                            }
                        },
                        function errorCallback(response) {
                            logResponse('ERROR:', response);
                        });
            }
        };
        // Get coupon by price
        $scope.byPrice = function () {
            // Set Type to All
            document.getElementById("typeSelect").selectedIndex = ($scope.couponType.length);
            // Purchased by price
            if ($scope.couponFilter.upToPrice != null) {
                companyCouponProxy.byPrice($scope.couponFilter.upToPrice)
                    .then(
                        function successCallback(response) {
                            $scope.coupons = response.data;
                            if ($scope.coupons.length == 0) {
                                $scope.message = 'no coupons in that price range';
                            } else {
                                $scope.message = '';
                            }
                        },
                        function errorCallback(response) {
                            logResponse('ERROR:', response);
                        });
            }
        };
        // Get coupon by start or end date
        $scope.ByDate = function () {
            var date = $scope.couponFilter.date;
            if (date != null) {
                if ($scope.couponFilter.dateRadio == "start") {
                    companyCouponProxy.byStartDate(date)
                        .then(
                            function successCallback(response) {
                                $scope.coupons = response.data;
                                if ($scope.coupons != '') {
                                    $scope.couponFilter.message = '';
                                } else {
                                    $scope.couponFilter.message = "No coupon in that date range";
                                }
                            },
                            function errorCallback(response) {
                                logResponse('ERROR:', response);
                            });
                } else if ($scope.couponFilter.dateRadio == "end") {
                    companyCouponProxy.byEndDate(date)
                        .then(
                            function successCallback(response) {
                                $scope.coupons = response.data;
                                if ($scope.coupons != '') {
                                    $scope.couponFilter.message = '';
                                } else {
                                    $scope.couponFilter.message = "No coupon in that date range";
                                }
                            },
                            function errorCallback(response) {
                                $scope.couponFilter.message = "No coupon in that date range";
                                logResponse('ERROR:', response);
                            });
                }
            }
        };

        ///////////////
        //New Coupon //
        ///////////////
        // List of coupon types
        $scope.types = couponTypesFactory;
        // When entering new coupon mode a new coupon object is created
        // to hold the new coupon details
        $scope.generateCouponTemplate = function () {
            $scope.couponTemplate = couponFactory();

            var today = new Date;
            var todayPlus30 = new Date;
            todayPlus30.setDate(todayPlus30.getDate() + 30);

            $scope.couponTemplate.startDate = today;
            $scope.couponTemplate.endDate = todayPlus30;
        };
        // TODO: IMAGE UPLOAD
        $scope.imagePathChanged = function () {
            alert(document.getElementById("image"));
        };
    });