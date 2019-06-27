Fields::DeliusAsmtInquiryField = GraphQL::Field.define do
  name "DeliusAsmtInquiry"
  type Types::DeliusAsmtInquiryType
  argument :fields, !Types::DeliusAsmtInquiryInputType
  resolve Resolver.new(->(_obj, args, _ctx) {
    form_fields = args[:fields]
    return { errors: ["Invalid email"] } unless form_fields.email.match?(Devise.email_regexp)

    return { errors: [] } unless form_fields.verification == ""

    SparkpostMailer.delius_asmt_inquiry(form_fields).deliver_now
  })
end
