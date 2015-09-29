var gulp = require('gulp');
var initGulpTasks = require('react-component-gulp-tasks');

var taskConfig = {
	component: {
		name: 'ScrollSpy',
		lib: 'lib',
		dependencies: [
			'react'
		]
	}
};

initGulpTasks(gulp, taskConfig);
