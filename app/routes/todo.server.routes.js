'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	todos = require('../../app/controllers/todos.server.controller');

module.exports = function(app) {
	// Article Routes
	app.route('/todos')
		.get(todos.list)
		.post(users.requiresLogin, todos.create);

	app.route('/todos/:todoId')
		.get(todos.read)
		.put(users.requiresLogin, todos.hasAuthorization, todos.update)
		.delete(users.requiresLogin, todos.hasAuthorization, todos.delete);

	// Finish by binding the article middleware
	app.param('todoId', todos.todoByID);
};
