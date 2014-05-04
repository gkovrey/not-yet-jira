module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            build: ['js', 'css', 'img']
        },
        requirejs: {
            build: {
                options: {
                    name: 'main',
                    optimize: 'none',
                    baseUrl: "js",
                    mainConfigFile: "src/js/config.js",
                    done: function (done, output) {
                        var duplicates = require('rjs-build-analysis').duplicates(output);
                        if (duplicates.length > 0) {
                            grunt.log.subhead('Duplicates found in requirejs build:');
                            grunt.log.warn(duplicates);
                            done(new Error('r.js built duplicate modules, please check the excludes option.'));
                        }
                        done();
                    },
                    out: "js/result.js"
                }
              }
        },
        concat: {
            build: {
                src: ['js/app/**/*.js', 'js/main'],
                dest: 'js/main.js'
            }
        },
        copy: {
            js: {
                files: [
                    {expand: true, flatten: true, src: ['src/js/app/modules/task/*.js',], dest: 'js/app/modules/task/' },
                    {expand: true, flatten: true, src: ['src/js/app/app.js'], dest: 'js/app'},
                    {expand: true, flatten: true, src: ['src/js/config.js', 'src/js/main.js'], dest: 'js/' },
                ]
            },
            img: {expand: true, flatten: true, src: 'src/img/*', dest: 'img/'},
        },
        uglify: {
            build: {
                files: [
                    {expand: true, flatten: true, src: ['src/js/vendor/*.js'], dest: 'js/vendor'}
                ]   
            }
            
        },
        cssmin: {
            minify: {expand: true, cwd: 'src/css/', src: ['*.css'], dest: 'css/',ext: '.min.css'
          }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-requirejs');


    grunt.registerTask('default', "Building the project",function () {
        var tasksList = ['clean', 'copy','uglify', 'requirejs', 'cssmin'];
        grunt.task.run(tasksList);
    });
};