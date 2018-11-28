# Initialize Redis.
redis = Redis.new

# Important: change this value to the ID of the user whose sessions you want to terminate.
user_id = 0

# Initialize sessions array.
sessions = []

# Pattern to match sessions.
pattern = "session_id:*"

auth_cache_key = "warden.user.user.key"

# Initial cursor position for Redis SCAN method.
current_cursor = 0

# Loop through iterations of Redis SCAN method.
iterations_finished = false
until iterations_finished
  # Scan the first set at the given cursor.
  items = redis.scan(current_cursor, match: pattern)
  # Reset current_cursor to the new one.
  current_cursor = items[0]
  # Add session keys without duplicates
  sessions |= items[1]
  # If this cursor isn't 0 then we have more iterations to make. (Read redis docs)
  current_cursor == "0" && iterations_finished = true
end

# Loop through the sessions and check user ID.
sessions.each do |item|
  # Get the session data from cache.
  cache_item = Rails.cache.fetch(item)
  # If session data contains user_id and it matches
  if cache_item.key?(auth_cache_key) && cache_item[auth_cache_key][0][0] == user_id
    # Then delete the session.
    Rails.cache.delete(item)
  end
end
