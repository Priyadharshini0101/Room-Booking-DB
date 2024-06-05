// Initialize the AngularJS application
var app = angular.module('myApp', ['ngRoute']);

app.config(['$locationProvider', function ($locationProvider) {
  $locationProvider.hashPrefix('');
}]);

// Configure the routes
app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
  .when('/login', {
          templateUrl: 'app/view/login.html',
          controller: 'loginController'
      })
      
      .when('/register', {
          templateUrl: 'app/view/register.html',
          controller: 'registerController'
      })
    
      .when('/roomBooking',{
          templateUrl: 'app/view/roomBooking.html',
          controller: 'roomBookingController'
      })

      .when('/home', {
          templateUrl: 'app/view/home.html',
          controller: 'homeController'
      })
      .when('/availability', {
          templateUrl: 'app/view/availabilityTemplate.html',
          controller: 'availabilityController'
      })
      .when('/viewBooking',{
        templateUrl: 'app/view/viewBooking.html',
        controller: 'viewBookingController'
      })
      .otherwise({ redirectTo: '/login' });
  console.log($routeProvider);

}]) 

app.controller('mainCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
    $scope.sample = "data";
    // localStorage.clear()

}])

//Custom Directive for adding a class when the input element if not valid
.directive('errorClass', function() {
  return {
    restrict: 'A',
    require: 'ngModel', 
    link: function(scope, element, attrs, ngModelCtrl) {
      scope.$watch(function() {
        return !ngModelCtrl.$valid && ngModelCtrl.$touched;
      },function(newVal) {
        if (newVal) {
          element.addClass('validation-error-input');
          element.addClass('placeholder-color')
        } else {
          element.removeClass('validation-error-input');
          element.removeClass('placeholder-color')
        }
      });
    }
  };
})
  
//Custom Directive for adding a class when the select element if not valid
.directive('errorClassSelect', function() {
  return {
    restrict: 'A',
    require: 'ngModel', 
    link: function(scope, element, attrs, ngModelCtrl) {
      scope.$watch(function() {
        return !ngModelCtrl.$valid && ngModelCtrl.$touched;
      }, function(newVal) {
        if (newVal) {
          element.addClass('validation-error-select');
        element.addClass('placeholder-color')
        } else {
          element.removeClass('validation-error-select');
        element.removeClass('placeholder-color')
        }
      });
    }
  };
})

//Custom Directive for displaying error text if the input field is empty
.directive('errorText', function() {
  return {
    restrict: 'C',
    require: '^ngModel', 
    link: function(scope, element, attrs, ngModelCtrl) {
      var errorTextElement = angular.element('<span></span>');
      scope.$watch(function() {
        return ngModelCtrl.$error.required && ngModelCtrl.$touched;
      }, function(newVal) {
        if (newVal) {
          var customText = element.attr('error-text')|| 'Valid input!';
          errorTextElement.text(customText);
          element.after(errorTextElement);
        } else {
          errorTextElement.text('');
          errorTextElement.remove();
        }
      });
    }
  };
})
  
