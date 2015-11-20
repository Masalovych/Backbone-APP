/*global Backbone, TodoMVC:true */

var TodoMVC = TodoMVC || {};

(function () {
	'use strict';

	var TodoApp = Backbone.Marionette.Application.extend({
		setRootLayout: function () {
			this.root = new TodoMVC.RootLayout();
		}
	});

	TodoMVC.App = new TodoApp();

	TodoMVC.App.on('before:start', function () {
		TodoMVC.App.setRootLayout();
	});

})();
