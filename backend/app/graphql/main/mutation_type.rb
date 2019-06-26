Main::MutationType = GraphQL::ObjectType.define do
  name "Mutation"

  field :inquiry, Fields::DeliusAsmtInquiryField
end
