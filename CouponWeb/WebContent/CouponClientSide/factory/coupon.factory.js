angular.module("Coupon")
    .factory('couponFactory', function () {
        return function () {
            return {
                id: null,
                title: '',
                startDate: '',
                endDate: '',
                amount: '',
                type: '',
                message: '',
                price: '',
                image: ''
            }
        }
    });
