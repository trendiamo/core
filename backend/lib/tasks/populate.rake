require_relative "../populate"

desc "Create some fake random data"
task populate: :environment do
  Populate.process
end
