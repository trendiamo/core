Types::ExpositionStatusType = GraphQL::EnumType.define do
  name "ExpositionStatus"

  value("DRAFT")
  value("PUBLISHED")
  value("ARCHIVED")
end
