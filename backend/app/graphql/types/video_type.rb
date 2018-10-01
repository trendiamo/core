Types::VideoType = GraphQL::ObjectType.define do
  name "Video"

  field :id, !types.ID
  field :status, types.String
  field :videoUrl, types.String do
    resolve ->(obj, _args, _ctx) { obj.video_url }
  end
end
