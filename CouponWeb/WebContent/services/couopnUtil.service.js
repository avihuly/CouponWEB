angular.module("Coupon")
    .service('couponUtil', function () {
    // password validation
    this.passwordValidation = function (password) {
        var pattern = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,10}/g;
        if (pattern.test(password) && (password.length < 10)){
            return true;
        } else {
            return "Password must contain:\n"
                + "6-10 characters\n"
                + "At lest one upper case letter\n"
                + "At lest one lower case letter\n"
                + "At lest one digit";
        }
    }

    // return false if user name exsist
    this.nameValidation = function (name, names) {
        if (names.length < 1){
            return "User name can't be empty";
        } else if (names.indexOf(name) > -1) {
            return "User name already exist";
        } else {
            return true;
        }
    }

});