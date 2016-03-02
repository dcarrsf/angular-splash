'use strict';

/* Services */

var dancarrcoServices = angular.module('dancarrcoServices', []);

dancarrcoServices.factory('navigationService', function($rootScope, $http, $q) {
	
    var navigationService = {};
		navigationService.json;
		navigationService.getJSON = function() {
			
			var deferred = $q.defer();
			$http.get('data/navigation.json')
				.success(function(data) {
					navigationService.json = data;
					deferred.resolve(data);
				})
				.error(function() {
					deferred.reject("Failed to get JSON");
				});
			return deferred.promise;
		};
    return navigationService;
});

dancarrcoServices.factory('screenService', function($rootScope) {
	
    var screenService = {};
		screenService.getSize = function() {
			return {width: $(window).width(), height: $(window).height()};
		};
		screenService.getMaxSize = function() {
			return Math.max($(window).width(), $(window).height());
		};
		screenService.getOrientation = function() {
			if( $(window).width() > $(window).height() ){
				return 0; // landscape	
			}
			return 1; // portrait
		};
    return screenService;
});

dancarrcoServices.factory('backgroundService', ['screenService', function(screenService) {
	
    var backgroundService = {};
		backgroundService.getSizedImage = function(screenName) {
			var maxSize = screenService.getMaxSize(); // TODO: return image sized to screen
			switch(screenName)
			{
				case "main":
					return "img/backgrounds/back-ink-blue.jpg";
				default:
					break;
			}
		};
    return backgroundService;
}]);

dancarrcoServices.factory('blogService', function() {
	
    var blogService = {};
		blogService.doSomething = function() {
			
			return true;
		};
    return blogService;
});

dancarrcoServices.factory('messageService', function($http, $q) {
	
    var messageService = {
			form: null,
			rules: null,
			scope: null,
			ready: true
		};
		// Setup form data
		messageService.setup = function(formID, scope, rules) {
			
			this.form = $("#"+formID);
			this.scope = scope;
			this.rules = rules;
		};
		// Validate form
		messageService.validate = function() {
			
			for(var name in this.rules){
				var isValid = true;
				var rule = this.rules[name];
				var value = $("#"+name).val();
				
				// Check for empty field
				if( value == undefined || value.length == 0 ){
					isValid = this.ready = false;
				}
				// Check email format
				if( rule.email && !this.validateEmail(value) ){
					isValid = this.ready = false;
				}
				// Check max characters
				if( rule.maxchars && rule.maxchars < value.length ){
					isValid = this.ready = false;
				}
				// Show errors
				if( !isValid ){
					this.scope[rule.errorFlag] = true;
				}
			}
			//this.scope.$apply();
			
			return this.ready;
		};
		// Send form
		messageService.submit = function() {
			
			var deferred = $q.defer();
			
			$.ajax({
				type: "POST",
				url: this.form.attr('action'),
				data: this.form.serialize(),
				success: function (data) {
					if( data == 'success' ){
						deferred.resolve(data);
					}else{  
						deferred.reject(data);
					}
				}
			});
			return deferred.promise;
		};
		// Reset errors
		messageService.reset = function() {
			
			this.ready = true;
			
			// Reset errors
			for(var name in this.rules){
				var rule = this.rules[name];
				this.scope[rule.errorFlag] = false;
			}
			//this.scope.$apply();
		};
		// Email validation
		messageService.validateEmail = function(email){
			
			var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
			return pattern.test(email);
		};
    return messageService;
});