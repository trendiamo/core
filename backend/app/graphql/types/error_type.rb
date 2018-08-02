Types::ErrorType = GraphQL::ObjectType.define do
  name "Error"

  field :key, !types.String do
    resolve ->(obj, _args, _ctx) {
      obj[:key]
    }
  end
  field :message, !types.String do
    resolve ->(obj, _args, _ctx) {
      obj[:message]
    }
  end
end
