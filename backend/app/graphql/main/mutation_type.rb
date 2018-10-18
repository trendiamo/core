Main::MutationType = GraphQL::ObjectType.define do
  name "Mutation"

  field :createExposition, Fields::CreateExpositionField
  field :updateExposition, Fields::UpdateExpositionField
  # field :deleteExposition, Fields::DeleteExpositionField

  field :updateWebsite, Fields::UpdateWebsiteField

  field :createHostname, Fields::CreateHostnameField
  field :updateHostname, Fields::UpdateHostnameField
  field :deleteHostname, Fields::DeleteHostnameField
end
