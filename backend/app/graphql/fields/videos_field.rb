Fields::VideosField = GraphQL::Field.define do
  name "videos"
  description "List videos"
  type !types[Types::VideoType]

  resolve ->(_obj, _args, _ctx) {
    result = GraphCMS::Client.query(VideosQuery)
    result.data.videos
  }
end
