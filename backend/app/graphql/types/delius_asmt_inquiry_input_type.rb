Types::DeliusAsmtInquiryInputType = GraphQL::InputObjectType.define do
  name "DeliusAsmtInquiryInput"

  argument :name, types.String
  argument :email, types.String
  argument :phone, types.String
  argument :message, types.String
  argument :url, types.String
  argument :asmt, types.Boolean
  argument :asmtStep1Choice, types.String
  argument :asmtStep2Choice, types.String
  argument :asmtStep3Choices, types.String
end
