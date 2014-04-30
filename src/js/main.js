define(function(require, exports, module) {
	'use strict';
	var Task, TaskCollection, tasks, TaskView, taskView, Application, application
	
	TaskCollection = require('collection').TaskCollection;
    TaskView = require('view').TaskView;

    tasks = new TaskCollection();

	Application = require('application').AppView;
	application = new Application({
		'tasks' : tasks,
		'taskView' : TaskView
	});
})