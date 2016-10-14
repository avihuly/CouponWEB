angular.module("Coupon")
    .factory('companyFactory', function () {
        return {
            id: null,
            compName: '',
            password: '',
            email: ''
        }
    });
