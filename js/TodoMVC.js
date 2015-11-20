/*global Backbone, TodoMVC:true, $ */

var TodoMVC = TodoMVC || {};

var app = {};

$(function () {
	'use strict';

	// After we initialize the app, we want to kick off the router
	// and controller, which will handle initializing our Views
	TodoMVC.App.on('start', function () {


    var urersList = new TodoMVC.UsersList();
    this.root.main.show(urersList);


	});

  TodoMVC.UserView = Backbone.Marionette.ItemView.extend({
    template: _.template('<span><%- userName %></span><span class="remove">X</span>'),
    tagName: 'li',

    serializeData: function(){
      return {
        userName: this.model.get('name'),
        editMode: false
      }
    },

    events: {
      'click .remove': 'remove2'
    },

    remove2: function(){
      this.model.collection.remove(this.model);
    }


  });



	TodoMVC.UsersList = Backbone.Marionette.CompositeView.extend({
	  template: _.template('<input class="newName" type="text"><ul id="list"></ul>'),
    childViewContainer: '#list',
    childView: TodoMVC.UserView,

    initialize: function(){
      var User = Backbone.Model.extend({
        url: "remove_user"
      });


      this.collection = new (Backbone.Collection.extend({
        model: User,

        initialize: function(){
          this.reset([
          {id: 1, name: 'Dima'},
          {id: 2, name: 'Emil'},
          {id: 3, name: 'Vasya'}
          ]);
        }
      }));
      app.col = this.collection;

    },

    ui: {
      nameInput: '.newName'
    },

    events: {
      'keyup input.newName': 'add'
    },

    add: function(event){
      if (event.keyCode === 13) {
        var newName = this.ui.nameInput.val();
        this.collection.add({name: newName});
        this.ui.nameInput.val('');
      }
    }



	});






	// start the TodoMVC app (defined in js/TodoMVC.js)
	TodoMVC.App.start();
});
