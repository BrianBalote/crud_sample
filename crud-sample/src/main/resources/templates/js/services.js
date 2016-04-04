'use strict';

var services = angular.module('crudApp.services', ['ngResource']);

services.factory('CustomerFactory', function ($resource) {
    return $resource('http://localhost:8080/delete-customer:id', {}, {
        show: { method: 'GET' },
        update: { method: 'PUT', params: {id: '@id'} },
        delete: { method: 'DELETE', params: {id: '@id'} }
    })
});