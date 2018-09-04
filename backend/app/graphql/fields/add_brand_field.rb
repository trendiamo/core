Fields::AddBrandField = GraphQL::Field.define do
  name "addBrand"
  type Types::BrandType
  argument :brand, !Types::BrandInputType
  resolve Resolver.new ->(obj, args, ctx) {
    use(Plugins::Pundit, obj: obj, args: args, ctx: ctx)

    brand_args = permitted_attributes(Brand).merge(user: current_user)
    @brand = policy_scope(Brand).new(brand_args)
    authorize(@brand)
    @brand.save!
    @brand
  }
end
