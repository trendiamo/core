Fields::UpdateBrandField = GraphQL::Field.define do
  name "Update Brand"
  type Types::BrandType
  argument :brand, !Types::BrandInputType
  resolve Resolver.new ->(obj, args, ctx) {
    use(Plugins::Pundit, obj: obj, args: args, ctx: ctx)
    brand_args = permitted_attributes(Brand).merge(user: current_user)
    @brand = Brand.find(args[:brand].id)
    authorize(@brand)
    @brand.update!(brand_args)
    if @brand.is_complete && @brand.shopify_collection_id.nil?
      Shopify::CreateCollection.new(@brand).perform
    end
    @brand
  }
end
