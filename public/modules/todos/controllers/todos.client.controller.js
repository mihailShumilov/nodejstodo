'use strict';

// Todos controller
angular.module('todos').controller('TodosController', ['$scope', '$stateParams', '$location', 'Authentication', 'Todos',
	function($scope, $stateParams, $location, Authentication, Todos) {
		$scope.authentication = Authentication;
    $scope.task = '';


		// Create new Article
		$scope.create = function() {
			// Create new Article object
			var todo = new Todos({
				task: this.task
			});

			todo.$save(function(response) {
				$scope.find();

				$scope.task = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Article
		$scope.remove = function(todo) {
			if (todo) {
				todo.$remove();

				for (var i in $scope.todos) {
					if ($scope.todos[i] === todo) {
						$scope.todos.splice(i, 1);
					}
				}
			} else {
				$scope.todo.$remove(function() {
					$location.path('todos');
				});
			}
		};



		// Find a list of Todos
		$scope.find = function() {
			$scope.todos = Todos.query();
		};

		// Find existing Article
		$scope.findOne = function() {
			$scope.todo = Todos.get({
				todoId: $stateParams.todoId
			});
		};
	}
]);