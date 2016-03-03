'use strict';

/* Directives */

var dancarrcoDirectives = angular.module('dancarrcoDirectives', []);

dancarrcoDirectives.directive('backgroundStyle', ['backgroundService', function(backgroundService){
    return {
        restrict: "A",
        link: function (scope, element, attrs) {
			
			var screenName = attrs.backgroundStyle;
			var imgPath = backgroundService.getSizedImage(screenName);
			
			element.css("backgroundImage", "url(" + imgPath + ")");
        }
    }
 }]);
 
dancarrcoDirectives.directive('mobileNavbar', ['navigationService', function(navigationService){
    return {
        restrict: "E",
        templateUrl: 'partials/navbar.html',
        link: function (scope, element, attrs) {
			
			// Get items
			var promise = navigationService.getJSON();
				promise.then( function(result){
					scope.navitems = result;
				}, function(reason){ 
					// error loading JSON...
				});
				
			/* Mobile menu based on the Hamburgler menu widget by John Morris */
			/* © 2015, John Morris http://johnm.io/project/hamburgler/ */
			
			// Icon animation
			$(".icon").click(function () {
				$(".mobilenav").fadeToggle(500);
				$(".top-menu").toggleClass("top-animate");
				$("body").toggleClass("noscroll");
				$(".mid-menu").toggleClass("mid-animate");
				$(".bottom-menu").toggleClass("bottom-animate");
			});
			
			// Resize
			var width = $(window).width();
			$(window).resize(function(){
				var w = $(window).width();
				if( w >= 1024 && width < 1024 ){
					$(".mobilenav").show();
					scope.closeMenuIcon();	
				}else if( w < 1024 && width >= 1024 ){
					$(".mobilenav").hide();
				}
				width = w;
			});
			
			// Close
			scope.closeMenuIcon = function(){
				$(".top-menu").removeClass("top-animate");
				$("body").removeClass("noscroll");
				$(".mid-menu").removeClass("mid-animate");
				$(".bottom-menu").removeClass("bottom-animate");
			}
			scope.closeMenu = function(){
				if( $(window).width()<1024 ){
					$(".mobilenav").fadeOut(500);
					scope.closeMenuIcon();	
				}
			}
			
			// Esc
			$(document).keydown(function(e) {
				if( e.keyCode == 27 && $(window).width() < 1024 ) {
					scope.closeMenu();
				}
			});
        }
    }
 }]);