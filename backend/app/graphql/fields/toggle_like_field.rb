Fields::ToggleLikeField = GraphQL::Field.define do
  name "Toggle like"
  type Types::ProductType
  argument :productId, !types.String
  argument :remove, !types.Boolean
  resolve Resolver.new ->(obj, args, ctx) {
    use(Plugins::Pundit, obj: obj, args: args, ctx: ctx)

    @product = Product.find(args[:productId])
    authorize(@product)
    if current_user
      like = @product.likes.find_by(user: current_user)
      if like
        like.destroy!
      else
        @product.likes.create!(user: current_user)
      end
    elsif args[:remove]
      @product.decrement!(:anonymous_likes_count)
    else
      @product.increment!(:anonymous_likes_count)
    end
    @product
  }
end
