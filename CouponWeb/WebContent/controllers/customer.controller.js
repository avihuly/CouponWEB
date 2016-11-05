angular.module("Coupon")
    .controller("customerController", function
        ($scope, $http, $rootScope, couponUtil,
         customerCouponProxy) {

        // Coupons model array
        $scope.couponsToBrowse = [];
        $scope.purchasedCoupons = [];
        // Search text
        $scope.searchText = '';
        // client Type
        $scope.clientType = $rootScope.clientType;
        // sidebar navigation click model
        $scope.sideBarRadioClickModel = "views/customerBrowseCoupons.view.html";

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
        }
    });