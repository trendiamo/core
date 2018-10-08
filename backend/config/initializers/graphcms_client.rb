require "graphlient"
module GraphCMS
  Client = Graphlient::Client.new(ENV['GRAPHCMS_URL'],
    headers: {
      "Authorization" => "Bearer #{ENV['GRAPHCMS_TOKEN']}"
    }
  )
end
