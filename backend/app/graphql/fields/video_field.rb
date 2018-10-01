Fields::VideoField = GraphQL::Field.define do
  name "video"
  description "Show video"
  type Types::VideoType

  resolve ->(_obj, _args, _ctx) {
    result = GraphCMS::Client.query(VideoQuery, variables: { id: "cjldlth7pl19g0953cmv6f5pz" })
    result.data.video
  }
end
