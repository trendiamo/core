Main::QueryType = GraphQL::ObjectType.define do
  name "Query"

  field :website, Fields::WebsiteField
  field :flow, Fields::FlowField
  field :seller, Fields::SellerField
  field :persona, Fields::SellerField
  field :showcase, Fields::ShowcaseField
  field :simpleChat, Fields::SimpleChatField
  field :outro, Fields::OutroField
end
