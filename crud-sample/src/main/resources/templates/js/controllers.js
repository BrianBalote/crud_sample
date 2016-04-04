'use strict';

var app = angular.module('crudApp.controllers', []);

app.controller('crudController', [
                          		'$scope',
                          		'$http',
                          		'$rootScope',
                          		'CustomerFactory',
                          		function($scope, $http, $rootScope, CustomerFactory) {

                          			$scope.customer = null;
                          			
                          			$scope.getCustomerList = function() {
                          				$http.get('http://localhost:8080/customer-list').success(
                          						function(data) {

                          							$scope.customerList = data;
                          						});
                          			};

                          			$scope.getTestCustomer = function() {
                          				$http.get('http://localhost:8080/test-customer').success(
                          						function(data) {

                          							$scope.testCustomer = data;
                          							console.log(data);
                          						});
                          			};

                          			$scope.deleteCustomer = function(id, index) {
                          				
                          				console.log(id);
                          				
                          				CustomerFactory.delete({ id: id });
                          				
                          				$scope.customerList.splice(index, 1);
                          			};
                          			
                          			$scope.addCustomer = function() {

                          				var timeStamp = JSON.stringify((new Date()).getTime());

                          				var postData = JSON.stringify({

                          					"id" : timeStamp,
                          					"firstName" : $scope.customer.firstName,
                          					"middleName" : $scope.customer.middleName,
                          					"lastName" : $scope.customer.lastName,
                          					"streetAddress" : $scope.customer.streetAddress,
                          					"city" : $scope.customer.city,
                          					"state" : $scope.customer.state,
                          					"country" : $scope.customer.country,
                          					"zipCode" : $scope.customer.zipCode,
                          					"phoneNumber" : $scope.customer.phoneNumber,
                          				})

                          				console.log(postData);
                          				
                          				var config = {
                          					headers : {
                          						"Content-Type" : "application/json"
                          					}
                          				}

                          				$http.post('http://localhost:8080/add-customer', postData,
                          						config).then(function(response) {

                          					console.log('add success');

                          					$scope.getCustomerList();

                          				}, function(response) {

                          					console.log('add error');
                          				});

                          				$scope.customer.id = null;
                          				$scope.customer = null;
                          			};

                          			$scope.resetCustomer = function() {

                          				$scope.customer = null;
                          			};
                          			
                          			$scope.editCustomer = function(index) {
                          				
                          				$scope.customer = $scope.customerList[index];
                          			};
                          			
                          			$scope.isNewCustomer = function() {
                          				
                          				if($scope.customer == null) {
                          					
                          					return true;
                          				
                          				} else {
                          					
                          					if($scope.customer.id == null) {
                          						
                          						return true;
                          					
                          					} else {
                          						
                          						return false;
                          					}
                          				}
                          			}
                          			
                          			$scope.updateCustomer = function(index) {
                          				
                          				var postData = JSON.stringify({

                          					"id" : $scope.customer.id,
                          					"firstName" : $scope.customer.firstName,
                          					"middleName" : $scope.customer.middleName,
                          					"lastName" : $scope.customer.lastName,
                          					"streetAddress" : $scope.customer.streetAddress,
                          					"city" : $scope.customer.city,
                          					"state" : $scope.customer.state,
                          					"country" : $scope.customer.country,
                          					"zipCode" : $scope.customer.zipCode,
                          					"phoneNumber" : $scope.customer.phoneNumber,
                          				})

                          				console.log(postData);
                          				
                          				var config = {
                          					headers : {
                          						"Content-Type" : "application/json"
                          					}
                          				}

                          				$http.post('http://localhost:8080/update-customer', postData,
                          						config).then(function(response) {

                          					console.log('update success');

                          					$scope.getCustomerList();

                          				}, function(response) {

                          					console.log('update error');
                          				});

                          				$scope.customer.id = null;
                          				$scope.customer = null;
                          			};

                          		} ]);
