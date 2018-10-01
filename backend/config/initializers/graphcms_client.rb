require "graphql/client"
require "graphql/client/http"

module GraphCMS
  HTTP = GraphQL::Client::HTTP.new(ENV['GRAPHCMS_URL'])

  #
    # Pass block to send auth token
    # def headers(context)
    #   {
    #     "Authorization" => "Bearer #{ENV['ACCESS_TOKEN']}"
    #   }
    # end
  #

  Schema = GraphQL::Client.load_schema(HTTP)

  Client = GraphQL::Client.new(schema: Schema, execute: HTTP)

end
