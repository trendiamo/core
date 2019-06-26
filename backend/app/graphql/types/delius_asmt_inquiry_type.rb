Types::DeliusAsmtInquiryType = GraphQL::ObjectType.define do
  name "DeliusAsmtInquiry"

  field :errors, !types[types.String] do
    resolve ->(obj, _args, _ctx) { obj[:errors] || [] }
  end
end
