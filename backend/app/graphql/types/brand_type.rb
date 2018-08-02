Types::BrandType = GraphQL::ObjectType.define do
  name "BrandType"

  field :id, !types.ID do
    resolve ->(obj, _args, _ctx) { obj.id }
  end
  field :name, !types.String
  field :legalName, !types.String do
    resolve ->(obj, _args, _ctx) { obj.legal_name }
  end
  field :legalAddressStreet, !types.String do
    resolve ->(obj, _args, _ctx) { obj.legal_address_street }
  end
  field :legalAddressNumber, !types.String do
    resolve ->(obj, _args, _ctx) { obj.legal_address_number }
  end
  field :legalAddressCity, !types.String do
    resolve ->(obj, _args, _ctx) { obj.legal_address_city }
  end
  field :legalAddressPostalCode, !types.String do
    resolve ->(obj, _args, _ctx) { obj.legal_address_postal_code }
  end
  field :legalAddressCountry, !types.String do
    resolve ->(obj, _args, _ctx) { obj.legal_address_country }
  end
  field :logoUrl, !types.String do
    resolve ->(obj, _args, _ctx) { obj.logo_url }
  end
  field :longDescription, types.String do
    resolve ->(obj, _args, _ctx) { obj.long_description }
  end
  field :shortDescription, types.String do
    resolve ->(obj, _args, _ctx) { obj.short_description }
  end
  field :headerContentPhoto, types.String do
    resolve ->(obj, _args, _ctx) { obj.header_content_photo }
  end
  field :headerContentVideo, types.String do
    resolve ->(obj, _args, _ctx) { obj.header_content_video }
  end
  field :domesticShippingTime, types.String do
    resolve ->(obj, _args, _ctx) { obj.domestic_shipping_time }
  end
  field :euShippingTime, types.String do
    resolve ->(obj, _args, _ctx) { obj.eu_shipping_time }
  end
  field :outsideEuShippingTime, types.String do
    resolve ->(obj, _args, _ctx) { obj.outside_eu_shipping_time }
  end
  field :generalShippingInfo, types.String do
    resolve ->(obj, _args, _ctx) { obj.general_shipping_info }
  end
  field :trendiamoShippingInfo, types.String do
    resolve ->(obj, _args, _ctx) { obj.trendiamo_shipping_info }
  end
  field :errors, !types[Types::ErrorType] do
    resolve ->(obj, _args, _ctx) {
      obj.errors.messages.to_a.map{ |(key,messages)| { key: key.to_s, message: messages.join(", ") } }
    }
  end
end
