Types::ChatType = GraphQL::ObjectType.define do
  name "Chat"

  field :id, !types.ID
  field :status, Types::StatusType
  field :title, types.String
  field :path, types.String
  field :website, Types::WebsiteType do
    resolve ->(obj, _args, _ctx) {
      obj.website
    }
  end
  field :chatStep, Types::ChatStepType do
    resolve ->(obj, _args, _ctx) {
      obj.chat_step
    }
  end
end
