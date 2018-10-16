desc "Deploy the app to dokku"
task :deploy do
  `cd ..; git subtree push --prefix backend dokku-backend master; cd -`
end

# forced deploy: (shouldn't be needed)
# git push dokku-backend `git subtree split --prefix backend master`:master --force
