require_relative "../populate"

desc "Create some fake random data"
task :populate do
  Populate.process
end
