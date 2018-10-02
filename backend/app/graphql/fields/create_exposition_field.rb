Fields::CreateExpositionField = GraphQL::Field.define do
  name "createExposition"
  type Types::ExpositionType
  argument :data, !Types::ExpositionInputType
  resolve Resolver.new ->(obj, args, ctx) {
    puts args[:data][:domain]
    puts args[:data][:description]
    puts args[:data][:ctaUrl]
    puts args[:data][:ctaText]
    result = GraphCMS::Client.query(CreateExpositionMutation, variables: { domain: args[:data][:domain], description: args[:data][:description], ctaUrl: args[:data][:ctaUrl], ctaText: args[:data][:ctaText] })
    puts result.errors.first
    result.data
    # use(Plugins::Pundit, obj: obj, args: args, ctx: ctx)
    # brand_args = permitted_attributes(Brand).merge(user: current_user)
    # @brand = Brand.find(args[:brand].id)
    # authorize(@brand)
    # @brand.update!(brand_args)
    # if @brand.is_complete && @brand.shopify_collection_id.nil?
    #   Shopify::CreateCollection.new(@brand).perform
    # end
    # @brand
  }
end
