angular.module("Coupon")
    .factory('customerFactory', function () {
        return function() {
            return {
                id: null,
                name: '',
                password: ''
            }
        }
    });
