namespace :npm do
      desc "Runs npm install in the deployed root of web servers."
      task :install, :roles => :app do
           run "cd #{latest_release} && npm install"
      end
end
