angular.module("Coupon")
    .controller("customerController", function
        ($scope, $http, $rootScope, couponUtil,
         customerCouponProxy, couponTypesFactory) {

        // Coupons model array
        $scope.couponsToBrowse = [];
        $scope.purchasedCoupons = [];
        // Search text
        $scope.searchText = '';
        // No coupon msg
        $scope.noCouponOfTypeLbl = '';
        // client Type
        $scope.clientType = $rootScope.clientType;
        // sidebar navigation click model
        $scope.sideBarRadioClickModel = "views/customerBrowseCoupons.view.html";
        // Coupon Types
        $scope.couponType = couponTypesFactory;
        $scope.couponType.push("All");
        $scope.typeOnfocus = '';

        // Browse coupons method
        $scope.browseCoupons = function () {
            customerCouponProxy.browse()
                .then(
                    function successCallback(response) {
                        $scope.couponsToBrowse = response.data;
                    },
                    function errorCallback(response) {
                        logResponse('ERROR:', response);
                    });
        };
        // Customer(my) coupons method
        $scope.purchasedCoupon = function () {
            customerCouponProxy.purchased()
                .then(
                    function successCallback(response) {
                        document.getElementById("typeSelect").selectedIndex = ($scope.couponType.length);
                        $scope.purchasedCoupons = response.data;
                    },
                    function errorCallback(response) {
                        logResponse('ERROR:', response);
                    });
        };
        // Buy coupon method
        $scope.buyCoupon = function (id) {
            customerCouponProxy.buy(id)
                .then(
                    function successCallback(response) {
                        $scope.purchasedCoupons.push(response.data);
                        logResponse('Purchased coupon:', response);
                    },
                    function errorCallback(response) {
                        logResponse('ERROR:', response);
                    });
        };
        // Purchased by type
        $scope.purchasedByType = function () {
            var index = document.getElementById("typeSelect").selectedIndex;
            var typeOptions = document.getElementById("typeSelect").options;
            var selectedType = typeOptions[index].text;

            if (selectedType == "All") {
                $scope.purchasedCoupon();
            } else {
                customerCouponProxy.purchasedByType(selectedType)
                    .then(
                        function successCallback(response) {
                            $scope.purchasedCoupons = response.data;
                            if ($scope.purchasedCoupons == '') {
                                $scope.noCouponOfTypeLbl =
                                    "No coupons of type '" + selectedType + "'";
                            } else {
                                $scope.noCouponOfTypeLbl = '';
                            }
                        },
                        function errorCallback(response) {
                            logResponse('ERROR:', response);
                        });
            }
        }
    });