#-- Project Settings
set :domain,      "project.tld"
set :application, "projectName"
set :keep_releases,  3
set :normalize_asset_timestamps, false

#-- Deploy tags. Sort to match semver'd tags.
#   -V flag for sort isn't available in OS X as of 10.9.2
set :branch do
  tag = `git tag | sort -t. -k 1,1n -k 2,2n -k 3,3n -k 4,4n`.split("\n").last
  tag
end

#-- Repo Settings
set :scm,         :git
set :repository,  "git@github.com:UseAllFive/project.git"
set :deploy_via, "remote_cache"

#-- Server settings
server "johnny5.ua5host.com", :app, :web, :db, :primary => true
set :ssh_options, {:forward_agent => true, :port => 22}
set :user, "root"
set :use_sudo, false
set :deploy_to,   "/var/www/vhosts/tld.project.subdomain"

after "deploy", "bower:install"
after "deploy", "npm:install"
after "deploy", "grunt:sass"
after "deploy", "grunt:uglify"
after "deploy", "grunt:cssmin"
