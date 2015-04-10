'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Article Schema
 */
var TodoSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	task: {
		type: String,
		default: '',
		trim: true,
		required: 'Task cannot be blank'
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Todo', TodoSchema);
