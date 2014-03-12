namespace :bower do
      desc "Runs bower install in the deployed root of web servers."
      task :install, :roles => :app do
           run "cd #{latest_release} && bower --allow-root install"
      end
end
