Main::QueryType = GraphQL::ObjectType.define do
  name "Query"

  field :flow, Fields::FlowField
  field :persona, Fields::PersonaField
  field :curation, Fields::CurationField
  field :scriptedChat, Fields::ScriptedChatField
  field :outro, Fields::OutroField
  field :chatStep, Fields::ChatStepField
end
