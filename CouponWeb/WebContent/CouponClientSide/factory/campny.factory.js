angular.module("Coupon")
    .factory('companyFactory', function () {
        return function() {
            return {
                id: null,
                name: '',
                password: '',
                email: ''
            }
        }
    });
