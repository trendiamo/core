Main::QueryType = GraphQL::ObjectType.define do
  name "Query"

  field :website, Fields::WebsiteField
  field :flow, Fields::FlowField
  field :persona, Fields::PersonaField
  field :showcase, Fields::ShowcaseField
  field :scriptedChat, Fields::ScriptedChatField
  field :outro, Fields::OutroField
  field :navigation, Fields::NavigationField
  field :chatStep, Fields::ChatStepField
end
