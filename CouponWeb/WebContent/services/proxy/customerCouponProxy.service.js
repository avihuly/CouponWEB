angular.module("Coupon")
    .service('customerCouponProxy', function ($http) {
        var baseUrl = "coupon/customer";

        this.browse = function () {
            return $http.get(baseUrl + "/browseCoupon");
        }

        this.purchased = function () {
            return $http.get(baseUrl + "/purchasedCoupons");
        }

        this.buy = function (id) {
            return $http({
                method: 'POST',
                url: baseUrl + "/purchaseCoupon",
                headers: {'Content-Type': 'text/plain'},
                data: id
            });
        }

    });