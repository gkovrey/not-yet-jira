requirejs.config({
    baseUrl: 'js',
    deps: ['main'],
    paths: {
        'underscore': 'vendor/underscore',
        'jquery': 'vendor/jquery',
        'backbone': 'vendor/backbone',
        'backbone.localStorage': 'vendor/backbone.localStorage',
        'json2': 'vendor/json2',
        'model': 'app/modules/task/model',
        'view': 'app/modules/task/view',
        'collection': 'app/modules/task/collection',
        'application' : 'app/app'
    },
    shim: {
        'jquery': {
            'exports' : '$'
        },
        'underscore': {
            'deps': ['jquery'],
            'exports': '_'
        },
        'backbone': {
            'deps': ['jquery'],
            'exports': 'Backbone'
        }
    }
});
