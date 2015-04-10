'use strict';

// Setting up route
angular.module('todos').config(['$stateProvider',
	function($stateProvider) {
		// Articles state routing
		$stateProvider.
		state('list', {
			url: '/list',
			templateUrl: 'modules/todos/views/list-todos.client.view.html'
		});
	}
]);