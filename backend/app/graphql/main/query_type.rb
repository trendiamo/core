Main::QueryType = GraphQL::ObjectType.define do
  name "Query"

  field :me, Fields::MeField
  field :website, Fields::WebsiteField
  field :conversation, Fields::ConversationField
end
