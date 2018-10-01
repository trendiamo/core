Connections::VideosConnection = Types::VideoType.define_connection do
  name 'videosConnection'

  field :aggregate do
    type !Types::AggregateType

    resolve ->(obj, _args, _ctx) {
      obj
    }
  end
end
