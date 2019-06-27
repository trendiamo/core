Fields::DeliusAsmtInquiryField = GraphQL::Field.define do
  name "DeliusAsmtInquiry"
  type Types::DeliusAsmtInquiryType
  argument :fields, !Types::DeliusAsmtInquiryInputType
  resolve Resolver.new(->(_obj, args, _ctx) {
    form_fields = args[:fields]
    return { errors: ["Invalid email"] } unless form_fields.email.match?(Devise.email_regexp)

    hash = form_fields.to_h.transform_keys { |key| key.to_s.underscore.to_sym }
    SparkpostMailer.delius_asmt_inquiry(hash).deliver_now
  })
end
