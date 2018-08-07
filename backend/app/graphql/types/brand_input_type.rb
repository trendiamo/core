Types::BrandInputType = GraphQL::InputObjectType.define do
  name "BrandInputType"
  argument :id, types.ID
  argument :name, types.String
  argument :legalName, types.String
  argument :legalAddressStreet, types.String
  argument :legalAddressNumber, types.String
  argument :legalAddressCity, types.String
  argument :legalAddressPostalCode, types.String
  argument :legalAddressCountry, types.String
  argument :logoUrl, types.String
  argument :shortDescription, types.String
  argument :longDescription, types.String
  argument :headerContentVideo, types.String
  argument :headerContentPhoto, types.String
  argument :domesticShippingTime, types.String
  argument :euShippingTime, types.String
  argument :outsideEuShippingTime, types.String
  argument :generalShippingInfo, types.String
  argument :trendiamoShippingInfo, types.String
end
