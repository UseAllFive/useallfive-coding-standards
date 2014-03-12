# Config files

These files can be copied into your project's root directory to configure the related tools to use these defaults.

## Editor Config
**URL:** http://editorconfig.org/
**Description:** EditorConfig helps developers define and maintain consistent coding styles between different editors and IDEs. The EditorConfig project consists of a file format for defining coding styles and a collection of text editor plugins that enable editors to read the file format and adhere to defined styles. EditorConfig files are easily readable and they work nicely with version control systems.

## JSHint
**URL:** http://jshint.com/
**Description:** JSHint is a community-driven tool to detect errors and potential problems in JavaScript code and to enforce your team's coding conventions.

## NPM
**URL:** http://npmjs.org/
**Description:** Package manager for node modules. Installs, publishes and manages node programs. Grunt can load node modules as tasks. Running `npm install` will load the contents of `package.json` and install the listed dependencies. The `package.json` file should be updated with project-specific information. The `package.json` included in this repository has the bare-minimum dependencies needed to successfully deploy using grunt.

The `package.json` file also confgures several variables used in Grunt tasks:

- `deploy_tasks` - an array of Grunt tasks to use in a deploy process. This may change depending on the project, for example to use `cap-deploy` or `gae:deploy`. Other custom tasks could be defined in the Gruntfile on a per-project basis.
- `js_files` - an array of paths to Javascript files that will get uglified.
- `sass_load_paths` - an array of sass stylesheet paths that will get compiled to css

## Bundler
**URL:** http://bundler.io/
**Description:** Bundler maintains a consistent environment for ruby applications. It tracks an application's code and the rubygems it needs to run, so that an application will always have the exact gems (and versions) that it needs to run. Used here to ensure capistrano has gems at the correct version to install. Update `Gemfile` and run `bundle install` to generate a `Gemfile.lock` for your project.

## Bower
**URL:** http://bower.io/
**Description:** Bower is a package manager for the web. It offers a generic, unopinionated solution to the problem of front-end package management, while exposing the package dependency model via an API that can be consumed by a more opinionated build stack. There are no system wide dependencies, no dependencies are shared between different apps, and the dependency tree is flat. The `bower.json` file should be updated with project-specific information.

## Capistrano
**URL:** https://github.com/capistrano/capistrano
**Description:** Remote multi-server automation tool. Used to automate deploy processes via ssh. The `config/deploy/general.rb` file should be updated with project-specific information, including remote server, repository, and deploy paths.

## Grunt
**URL:** http://gruntjs.com/
**Description:** Grunt is a task-runner written in javascript. The included `Gruntfile.js` has the bare-minimum configuration needed to deploy using capistrano. Run `grunt deploy` to deploy once project settings have been configured to deploy to a remote server using capistrano. Grunt will perform the following operations:

- prompt the user to choose a version number
- create a tag named with that version number
- push the tag to origin
- deploy the tag to johnny5.ua5host.com
- compile sass
- minify the css
- uglify the js

Code will be made live on the remote server upon successful completion of the above tasks.
