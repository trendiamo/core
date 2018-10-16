Types::StatusType = GraphQL::EnumType.define do
  name "Status"

  value("DRAFT")
  value("PUBLISHED")
  value("ARCHIVED")
end
