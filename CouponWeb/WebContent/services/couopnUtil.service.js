angular.module("Coupon")
    .service('couponUtil', function () {
        // password validation
        this.passwordValidation = function (password) {
            var pattern = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,10}/g;
            if (pattern.test(password) && (password.length < 10)) {
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
            if (names.length < 1) {
                return "User name can't be empty";
            } else if (names.indexOf(name) > -1) {
                return "User name already exist";
            } else {
                return true;
            }
        }

        // return false if date is not in the correct format
        this.dateValidation = function (date) {
            var pattern = /(2)(?=.*[0-9]).{3}(-)(((0)(?=.*[1-9]).{1})|((1)(?=.*[0-2]).{1}))(-)(|((0)(?=.*[1-9]).{1})|((1)(?=.*[0-9]).{1})|((2)(?=.*[0-9]).{1})|((3)(?=.*[0-1]).{1}))/g;

            if (!(pattern.test(date) && date.length == 10)) {
                return "Date format: yyyy-mm-dd";
            } else if (Date.parse(date) < new Date()) {
                return "Date can't be in the past";
            } else {
                return true;
            }
        }

        this.dateToStringFormat = function (date) {
            var StringFormattedDate =
                date.getFullYear() +
                "-" + ("0" + date.getMonth()).slice(-2) +
                "-" + ("0" + date.getDay()).slice(-2);
            return StringFormattedDate;
        }
    });



