angular.module("Coupon")
    .factory('couponFilterFactory', ['couponTypesFactory', function (couponTypesFactory) {
        return function () {
            var couponFilter = {
                date: null,
                dateRadio: "start",
                couponTypes: couponTypesFactory,
                typeOnfocus: "All",
                message: ''
            };
            couponFilter.couponTypes.push("All");
            return couponFilter;
        }
    }]);