Types::DeliusAsmtInquiryInputType = GraphQL::InputObjectType.define do
  name "DeliusAsmtInquiryInput"

  argument :name, types.String
  argument :email, types.String
  argument :phone, types.String
  argument :message, types.String
  argument :url, types.String
  argument :tags, types.String
end
