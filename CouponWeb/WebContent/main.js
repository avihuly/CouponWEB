/**
 * Created by Avi on 03/09/2016.
 */
var app = angular.module("Coupon", ['ngRoute', 'xeditable', 'ui.bootstrap']);

// this method will be acscuted before components (Ctrl's) are loaded
app.config(function ($routeProvider) {
    console.log("start of web app");

    $routeProvider
        .when("/", {redirectTo:"/login"})
        .when("/login", {controller: "loginController", templateUrl:"views/login.view.html"})
        .when("/adminhome", {controller: "adminhomeController", templateUrl:"views/adminhome.view.html"})
        .when("/companyhome", {controller: "companyController", templateUrl:"views/companyhome.view.html"})
});


// this method will be acscuted after components (Ctrl) are loaded
app.run(function (editableOptions, editableThemes) {
    console.log("run web app");
    editableOptions.theme = 'bs3';
});


// Util methods
// TODO: move to a new logservice
function logResponse(message, response) {
    console.log(message);
    console.log(response.data);
}






















// 'Access-Control-Allow-Origin': '*',
// 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
// 'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With',
// 'X-Random-Shit':'123123123'