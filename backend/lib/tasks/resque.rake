require "resque/tasks"
require "resque/scheduler/tasks"

task "resque:setup" => :environment do
  require "resque"
  require "resque-scheduler"
end
