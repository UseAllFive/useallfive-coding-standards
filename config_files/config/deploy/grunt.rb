namespace :grunt do
      desc "Minifies css files in the deployed root of web servers."
      task :cssmin, :roles => :app do
           run "cd #{latest_release} && grunt cssmin"
      end
      desc "Complies sass to css in the deployed root of web servers."
      task :sass, :roles => :app do
           run "cd #{latest_release} && grunt sass"
      end
      desc "Uglifies js files in the deployed root of web servers."
      task :uglify, :roles => :app do
           run "cd #{latest_release} && grunt uglify"
      end
end
