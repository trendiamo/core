Fields::CreateExpositionField = GraphQL::Field.define do
  name "createExposition"
  type Types::ExpositionType
  argument :data, !Types::ExpositionInputType
  resolve Resolver.new ->(obj, args, ctx) {
    puts args[:data][:domain]
    puts args[:data][:description]
    puts args[:data][:ctaUrl]
    puts args[:data][:ctaText]
    # result = GraphCMS::Client.mutation(CreateExpositionMutation, variables: { data: args[:data] })
    # result.data.exposition
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
