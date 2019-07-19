desc "Deploy the app to the specified environment"
task :deploy do
  unless %w[production staging].include?(ENV["e"])
    puts("Usage: #{$PROGRAM_NAME} e=production|staging")
    exit(127)
  end
  if ENV["e"] == "production"
    `cd ..; git subtree push --prefix backend dokku-backend master; cd -`
  elsif ENV["e"] == "staging"
    `cd ..; git subtree push --prefix backend dokku-staging-backend master; cd -`
  end
end

# deploy different branch: (shouldn't be needed)
# git push dokku-backend `git subtree split --prefix backend <your-branch-name>`:master
# forced deploy: (shouldn't be needed)
# git push dokku-backend `git subtree split --prefix backend master`:master --force
