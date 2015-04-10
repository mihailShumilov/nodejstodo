'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('todos').factory('Todos', ['$resource',
	function($resource) {
		return $resource('todos/:todoId', {
			todoId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);