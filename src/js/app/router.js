define(function(require, exports, module) {
    'use strict';
    var Backbone = require('backbone');

    exports.Router = Backbone.Router.extend({

        routes: {
            "task/:id" : "getTask"
        },

        getTask : function (id) {
            console.log(id);
        }

    });
});