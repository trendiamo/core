Connections::WebsitesConnection = Types::WebsiteType.define_connection do
  name "websitesConnection"

  field :aggregate do
    type !Types::AggregateType

    resolve ->(obj, _args, _ctx) {
      obj
    }
  end
end
