Fields::SellerField = GraphQL::Field.define do
  name "seller"
  description "Show seller"
  type Types::SellerType
  argument :id, types.ID
  resolve ->(_obj, args, _ctx) {
    if args[:id].scan(/^\d+$/).any?
      Seller.find(args[:id])
    else
      Seller.find_by!(graphcms_ref: args[:id])
    end
  }
end
