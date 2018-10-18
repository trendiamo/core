Types::HostnameType = GraphQL::ObjectType.define do
  name "Hostname"

  field :id, !types.ID
  field :status, Types::StatusType
  field :hostname, types.String
  field :website, Types::WebsiteType do
    resolve ->(obj, _args, _ctx) do
      obj.website
    end
  end
end
