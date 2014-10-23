define(function (require, exports, module) {
    'use strict';
    var Backbone, Task;
    Backbone = require('backbone');
    Task = require('app/modules/task/model').Task;
    
    Backbone.LocalStorage = require('backbone.localStorage');

    exports.TaskCollection = Backbone.Collection.extend({
        // Reference to this collection's model.
        model: Task,

        // Save all of the task items under the `"yandex-tasks"` namespace.
        localStorage: new Backbone.LocalStorage("yandex-tasks"),

        initialize : function(options) {
            this.options = options;
        },

        // Filter down the list to only task items that are still not finished.s
        remaining: function() {
            return this.without.apply(this, this.done());
        },

        // tasks are sorted by their original insertion order.
        comparator: function(task) {
            return task.get('title');
        }

    });
});