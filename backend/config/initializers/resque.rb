Resque.redis = ENV["REDIS_URL"] if ENV["REDIS_URL"]
Resque.schedule = YAML.load_file(Rails.root.join('config', 'resque_schedule.yml')) if ENV["REDIS_URL"]
