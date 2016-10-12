/**
 * Created by Avi on 03/09/2016.
 */
var app = angular.module("Coupon", ['ngRoute', 'xeditable']);

// this method will be acscuted before components (Ctrl's) are loaded
app.config(function ($routeProvider) {
    console.log("start of web app");

    $routeProvider
        .when("/", {redirectTo:"/login"})
        .when("/login", {controller: "loginController", templateUrl:"views/login.view.html"})
        .when("/adminhome", {controller: "adminhomeController", templateUrl:"views/adminhome.view.html"})
});


// this method will be acscuted after components (Ctrl) are loaded
app.run(function (editableOptions, editableThemes) {
    console.log("run web app");
    editableOptions.theme = 'bs3';
    editableThemes.bs3.fromTpl = '<form class="editable-wrap" role="form" ng-class="xformClass"</form>';
    editableThemes.bs3.controlsTpl = '<div class="editable-controls form-group row" ng-class="{\'has-error\': $error}"></div>';
});

///////////////////
// Util services //
///////////////////
app.service('couponUtil', function () {
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
});


// Util methods
function logResponse(message, response) {
    console.log(message);
    console.log(response.data);
}






















// 'Access-Control-Allow-Origin': '*',
// 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
// 'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With',
// 'X-Random-Shit':'123123123'