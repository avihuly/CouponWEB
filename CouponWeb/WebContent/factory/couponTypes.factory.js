angular.module("Coupon")
    .factory('couponTypesFactory', function () {
        return ["RESTAURANT", "ELECTRICITY", "FOOD", "HEALTH",
            "SPORTS", "CAMPING", "TRAVELLING"];
    });
