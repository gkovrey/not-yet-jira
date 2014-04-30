define(function (require, exports, module) {
	'use strict';
	var Backbone;

	Backbone = require('backbone');
	Backbone.localStorage = require('backbone.localStorage');
	
	exports.Task = Backbone.Model.extend({
    	// Default attributes for the task item.
	    defaults: function() {
	      return {
	        title: "empty task...",
	        state: 0
	      };
	    },

	    // Ensure that each task created has `title`.
	    initialize: function() {
			if (!this.get("title")) {
				this.set({"title": this.defaults().title});
			}
	    }
  	});	
})