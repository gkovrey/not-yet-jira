define(function(require, exports, module){
	'use strict';
    var Backbone = require('backbone');

	exports.AppView = Backbone.View.extend({

	    // Instead of generating a new element, bind to the existing skeleton of
	    // the App already present in the HTML.
	    el: $("#todoapp"),

	    // Our template for the line of statistics at the bottom of the app.
	    statsTemplate: _.template($('#stats-template').html()),

	    // Delegated events for creating new items, and clearing completed ones.
	    events: {
            "keypress #new-todo":  "createOnEnter",
            "click #clear-completed": "clearCompleted",
            "click #toggle-all": "toggleAllComplete"
	    },

	    // At initialization we bind to the relevant events on the `Todos`
	    // collection, when items are added or changed. Kick things off by
	    // loading any preexisting todos that might be saved in *localStorage*.
	    initialize: function(options) {
            this.options = options;
            this.Tasks = this.options.tasks;

            this.TaskView = this.options.taskView;
            this.input = this.$("#new-todo");

            this.$tasksList = this.$("#todo-list");
            this.$tasksListInProgress = this.$("#todo-list-inprogress");
            this.$tasksListDone = this.$("#todo-list-done")

            this.listenTo(this.Tasks, 'add', this.addOne);
            this.listenTo(this.Tasks, 'reset', this.addAll);
            this.listenTo(this.Tasks, 'all', this.render);
            this.listenTo(this.Tasks, 'change:state', this.reRender);

            this.footer = this.$('footer');
            this.main = $('#main');

            this.Tasks.fetch();
	    },

	    // Re-rendering the App just means refreshing the statistics -- the rest
	    // of the app doesn't change.
	    render: function() {
            this.main.show();
            this.footer.show();
	    },

	    // Add a single todo item to the list by creating a view for it, and
	    // appending its element to the `<ul>`.
	    addOne: function(task) {
            var view = new this.TaskView({model: task});
            switch(view.model.get('state')) {
                case 0:
                    this.$tasksList.append(view.render().el);
                    break;
                case 1:
                    this.$tasksListInProgress.append(view.render().el);
                    break;
                case 2:
                    this.$tasksListDone.append(view.render().el);
                    break;
                default:
                    this.$tasksList.append(view.render().el);
                    break;
            }
            

	    },

	    // Add all items in the **Todos** collection at once.
	    addAll: function() {
            this.Tasks.each(this.addOne, this);
	    },

        reRender: function() {
            this.clearAll();
            this.addAll();
        },

        clearAll: function() {
            this.$tasksList.empty();
            this.$tasksListInProgress.empty();
            this.$tasksListDone.empty();
        },

	    // If you hit return in the main input field, create new **Todo** model,
	    // persisting it to *localStorage*.
	    createOnEnter: function(e) {
	      if (e.keyCode != 13) return;
	      if (!this.input.val()) return;

	      this.Tasks.create({title: this.input.val()});
	      this.input.val('');
	    }

 	});
});