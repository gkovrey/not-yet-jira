requirejs.config({
    baseUrl: 'js',
    deps: ['main'],
    paths: {
        'underscore': 'vendor/underscore',
        'jquery': 'vendor/jquery',
        'backbone': 'vendor/backbone',
        'backbone.localStorage': 'vendor/backbone.localStorage',
        'json2': 'vendor/json2',
        'application' : 'app/app',
        'router' : 'app/router'
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
