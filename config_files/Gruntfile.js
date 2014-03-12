/* global, process, module, require */

var _matchdep = require('matchdep');

module.exports = function(grunt) {

    "use strict";

    var deploy_tasks;
    var pkg =  grunt.file.readJSON('package.json');

    grunt.initConfig({
        //-- Exposed functions and variables
        pkg: pkg,
        semver: require('semver'),

        jsFiles: pkg.grunt.js_files,

        bower: {
            install: {
            }
        },
        bump: {
            options: {
                commitFiles: [ //-- Files to add to release commit
                    'package.json',
                    'bower.json'
                ],
                files: [ //-- Files to bump
                    'package.json',
                    'bower.json'
                ],
                pushTo: 'origin',
                updateConfigs: ['pkg']
            }
        },
        cssmin: {
            options: {
                keepSpecialComments: 0
            },
            dist: {
                files: {
                    'web/css/main.css': [ 'web/css/main.css' ]
                }
            }
        },
        exec: {
            'bundle-install': {
                command: 'bundle install'
            },
            'cap-deploy': {
                command:  'bundle exec cap deploy'
            }
        },
        prompt: {
            bump: {
                options: {
                    questions: [
                        {
                            config: 'bump.increment',
                            type: 'list',
                            message: 'Bump version from ' + pkg.version.cyan + ' to:',
                            choices: [
                                {
                                    value: 'patch',
                                    name: 'Patch:  '.yellow +
                                        '<%= semver.inc(pkg.version, "patch") %>'.yellow +
                                        '   Backwards-compatible bug fixes.'
                                },
                                {
                                    value: 'minor',
                                    name: 'Minor:  '.yellow +
                                        '<%= semver.inc(pkg.version, "minor") %>'.yellow +
                                        '   Add functionality in a backwards-compatible manner.'
                                },
                                {
                                    value: 'major',
                                    name: 'Major:  '.yellow +
                                        '<%= semver.inc(pkg.version, "major") %>'.yellow +
                                        '   Incompatible API changes.'
                                }
                            ]
                        }
                    ]
                }
            }
        },
        sass: {
            options: {
                loadPath: pkg.grunt.sass_load_paths
            },
            dist: {
                files: {
                    'web/css/main.css': 'web/scss/main.scss'
                }
            }
        },
        uglify: {
            js: {
                files: {
                    'web/js/app.js': '<%= jsFiles %>'
                }
            }
        },
        watch: {
            options: {},
            bower: {
                files: 'bower.json',
                tasks: 'bower:install'
            },
            uglify_js: {
                files: '<%= jsFiles %>',
                tasks: 'uglify:js'
            }
        }
    });

    //-- Load plugins.
    _matchdep.filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.registerTask('default', [
        'bower:install',
        'exec:bundle-install',
        'sass',
        'uglify',
        'watch'
    ]);

     /**
     * Internal task to use the prompt settings to create a tag
     */
    grunt.registerTask('bump:prompt', function() {
        var increment = grunt.config("bump.increment");
        if (!increment) {
            grunt.fatal('bump.increment config not set!');
        }

        grunt.task.run('bump:' + increment);
    });

    grunt.registerTask('deploy', pkg.grunt.deploy_tasks);

};
