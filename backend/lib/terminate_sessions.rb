# call with: TerminateSessions.perform(10)
class TerminateSessions
  AUTH_CACHE_KEY = "warden.user.user.key".freeze
  REDIS_SESSION_PATTERN = "_session_id:*".freeze
  attr_reader :user_id, :redis

  def self.perform(user_id)
    new(user_id).perform
  end

  def initialize(user_id)
    @user_id = user_id
    @redis = Redis.new
  end

  def perform
    sessions = scan_sessions
    sessions.each do |item|
      cache_item = Rails.cache.fetch(item)
      Rails.cache.delete(item) if cache_item.key?(AUTH_CACHE_KEY) && cache_item[AUTH_CACHE_KEY][0][0] == user_id
    end
  end

  private

  def scan_sessions
    sessions = []
    cursor = 0
    loop do
      cursor, new_sessions = redis.scan(cursor, match: REDIS_SESSION_PATTERN)
      sessions |= new_sessions
      break if cursor == "0"
    end
    sessions
  end
end
