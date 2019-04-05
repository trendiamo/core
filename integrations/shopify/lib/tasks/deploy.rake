desc "Deploy the app to dokku"
task :deploy do
  `cd ../..; git subtree push --prefix integrations/shopify dokku-shopify master; cd -`
end
