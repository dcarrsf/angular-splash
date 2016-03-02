'use strict';

/**
 * @ngdoc overview
 * @name dancarrcoApp
 * @description
 * # dancarrcoApp
 *
 * Main module of the application.
 */
 var dancarrcoApp = angular.module('dancarrcoApp', [
    'ngRoute',
	'ngAnimate',
	'dancarrcoControllers',
	'dancarrcoDirectives',
	'dancarrcoServices'
]);

// Navigation
dancarrcoApp.config(function ($routeProvider) {
	
    $routeProvider
      .when('/', {
        templateUrl: 'partials/main.html',
        controller: 'MainCtrl'
      })
      .when('/blog', {
        templateUrl: 'partials/blog.html',
        controller: 'BlogCtrl'
      })
      .when('/contact', {
        templateUrl: 'partials/contact.html',
        controller: 'ContactCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });