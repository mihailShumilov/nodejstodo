'use strict';

// Configuring the Articles module
angular.module('todos').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Todos', 'todos', 'dropdown', '/todos');
		Menus.addSubMenuItem('topbar', 'todos', 'List', '/todos/list');
	}
]);