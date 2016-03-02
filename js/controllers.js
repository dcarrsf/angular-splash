'use strict';

// CONTROLLERS ============================================

var dancarrcoControllers = angular.module('dancarrcoControllers', []);

// home page controller
dancarrcoControllers.controller('MainCtrl', ['$scope', function($scope) {
	// Add stuff here...
    $scope.pageClass = 'page-home';
}]);
  
// blog page controller
dancarrcoControllers.controller('BlogCtrl', ['$scope', function($scope) {
	// Add stuff here...
    $scope.pageClass = 'page-blog';
}]);
  
// social media page controller
dancarrcoControllers.controller('MainCtrl', ['$scope', function($scope) {
	// Add stuff here...
    $scope.pageClass = 'page-social';
}]);

// contact page controller
dancarrcoControllers.controller('ContactCtrl', ['$scope', 'messageService', function($scope, messageService) {
	
    $scope.pageClass = 'page-contact';
	
	// State flags
	$scope.isFormSubmitted = false;
	$scope.isFormSuccessful = false;
	$scope.isFormFailed = false;
	
	// Validation flags
	$scope.isSubjectValid = false;
	$scope.isEmailValid = false;
	$scope.isMessageValid = false;
	
	// Setup service
	messageService.setup("messageForm", $scope, {
		subject: {
			errorFlag: "isSubjectValid"
		},
		email: {
			email: true,
			errorFlag: "isEmailValid"
		},
		message: {
			maxchars: 8000,
			errorFlag: "isMessageValid"	
		}
	});
	
	// Submit form
	$("#messageForm").on('submit', function(e) {
		
		e.preventDefault();
		
		// Validate and submit
		if( messageService.validate() ){
			
			$scope.isFormSubmitted = true;
			$scope.$apply();	
			
			$.ajax({
				type: "POST",
				url: 'cgi-bin/send-email.php',
				data: {
					subject: $("#subject").val(), 
					email: $("#email").val(), 
					message: $("#message").val()
				},
				success: function (data) {
					if( data == 'success' ){
						$scope.isFormSuccessful = true;
					}else{  
						$scope.isFormFailed = true;
					}
					$scope.$apply();	
				}
			});
			
			/*
			// Send it!
			var promise = messageService.submit();
				promise.then( function(result){
					$scope.isFormSuccessful = true;
					//$scope.$apply();
				}, function(reason){ 
					$scope.isFormFailed = true;
					//$scope.$apply();	
				});*/
		}else{
			
			$scope.$apply();	
		}
	});
	// Reset form
	$(".feedbackBtn").on('click', function (e) {
		
		// Reset fields
		$("#messageForm")[0].reset();
		
		// Reset state flags
		$scope.isFormSuccessful = false;
		$scope.isFormFailed = false;
		$scope.isFormSubmitted = false;
			
		// Reset service
		messageService.reset();
		
		$scope.$apply();	
	});
}]);
  