angular.module("Coupon")
    .factory('couponFilterFactory', ['couponTypesFactory', function (couponTypesFactory) {
        return function () {
            var couponTypes = angular.copy(couponTypesFactory);
            var couponFilter = {
                price: null,
                date: null,
                dateRadio: "start",
                couponTypes: couponTypes,
                typeOnfocus: "All",
                message: ''
            };
            couponFilter.couponTypes.push("All");
            return couponFilter;
        }
    }]);