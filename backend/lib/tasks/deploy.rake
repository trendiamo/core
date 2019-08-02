desc "Deploy the app to staging"
task :"staging-deploy" do
  `cd ..; git subtree push --prefix backend dokku-staging-backend master; cd -`
end

desc "Deploy the app to production"
task :deploy do
  `cd ..; git subtree push --prefix backend dokku-backend master; cd -`
end

# deploy different branch: (shouldn't be needed)
# git push dokku-backend `git subtree split --prefix backend <your-branch-name>`:master
# forced deploy: (shouldn't be needed)
# git push dokku-backend `git subtree split --prefix backend master`:master --force
