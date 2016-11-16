/**
 * Created by Avi on 03/09/2016.
 */
var app = angular.module("Coupon", ['ngRoute', 'ui.bootstrap', 'xeditable']);

// this method will be acscuted before components (Ctrl's) are loaded
app.config(function ($routeProvider) {
    console.log("start of web app");

    $routeProvider
        .when("/", {redirectTo:"/login"})
        .when("/login", {controller: "loginController", templateUrl:"views/login.view.html"})
        .when("/adminhome", {controller: "adminhomeController", templateUrl:"views/adminhome.view.html"})
        .when("/companyhome", {controller: "companyController", templateUrl:"views/companyhome.view.html"})
        .when("/customerhome", {controller: "customerController", templateUrl:"views/customerhome.view.html"})
        .when("/500", {templateUrl:"views/500.html"})
});

// this method will be acscuted after components (Ctrl) are loaded
app.run(function (editableOptions) {
    console.log("run web app");
    editableOptions.theme = 'bs3';
});























// 'Access-Control-Allow-Origin': '*',
// 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
// 'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With',
// 'X-Random-Shit':'123123123'