Main::MutationType = GraphQL::ObjectType.define do # rubocop:disable Metrics/BlockLength TODO: remove after reorg
  name "Mutation"

  field :toggleLike, Types::ProductType do
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

  field :addComment, Types::CommentType do
    argument :comment, !Types::CommentInputType
    resolve Resolver.new ->(obj, args, ctx) {
      use(Plugins::Pundit, obj: obj, args: args, ctx: ctx)

      comment_args = permitted_attributes(Comment).merge(user: current_user)
      @comment = policy_scope(Comment).new(comment_args)
      authorize(@comment)
      @comment.save!
      @comment
    }
  end

  field :togglePinComment, Types::CommentType do
    argument :commentId, !types.ID
    resolve Resolver.new ->(obj, args, ctx) {
      use(Plugins::Pundit, obj: obj, args: args, ctx: ctx)

      @comment = Comment.find(args[:commentId])
      authorize(@comment)
      @comment.update!(pinned: !@comment.pinned)
      @comment
    }
  end

  field :toggleUpvote, Types::CommentType do
    argument :commentId, !types.ID
    argument :remove, !types.Boolean
    resolve Resolver.new ->(obj, args, ctx) {
      use(Plugins::Pundit, obj: obj, args: args, ctx: ctx)

      @comment = Comment.find(args[:commentId])
      authorize(@comment)
      if current_user
        upvote = Upvote.find_by(comment: @comment, user: ctx[:current_user])
        if upvote
          upvote.destroy!
        else
          Upvote.create!(comment: @comment, user: ctx[:current_user])
        end
      elsif args[:remove]
        @comment.decrement!(:anonymous_upvotes_count)
      else
        @comment.increment!(:anonymous_upvotes_count)
      end
      @comment.reload
    }
  end

  field :flag, Types::CommentType do
    argument :commentId, !types.ID
    resolve Resolver.new ->(obj, args, ctx) {
      use(Plugins::Pundit, obj: obj, args: args, ctx: ctx)

      @comment = Comment.find(args[:commentId])
      authorize(@comment)
      return if ctx[:current_user] && InappropriateFlag.find_by(comment: @comment, user: ctx[:current_user])
      InappropriateFlag.create!(comment: @comment, user: ctx[:current_user])
      @comment.reload
    }
  end

  field :removeComment, Types::CommentType do
    argument :commentId, !types.ID
    resolve Resolver.new ->(obj, args, ctx) {
      use(Plugins::Pundit, obj: obj, args: args, ctx: ctx)

      @comment = Comment.find(args[:commentId])
      authorize(@comment)
      @comment.update!(removed_at: Time.now.utc) unless @comment.removed_at
      @comment
    }
  end

  field :addBrand, Types::BrandType do
    argument :brand, !Types::BrandInputType
    resolve Resolver.new ->(obj, args, ctx) {
      use(Plugins::Pundit, obj: obj, args: args, ctx: ctx)

      brand_args = permitted_attributes(Brand).merge(user: current_user)
      @brand = policy_scope(Brand).new(brand_args)
      authorize(@brand)
      @brand.save
      @brand
    }
  end

  field :updateBrand, Types::BrandType do
    argument :brand, !Types::BrandInputType
    resolve Resolver.new ->(obj, args, ctx) {
      use(Plugins::Pundit, obj: obj, args: args, ctx: ctx)
      brand_args = permitted_attributes(Brand).merge(user: current_user)
      @brand = Brand.find(args[:brand].id)
      authorize(@brand)
      @brand.update(brand_args)
      if @brand.is_complete && ShopifyAPI::SmartCollection.find(@brand.shopify_collection_id).nil?
        @create_collection = Shopify::CreateCollection.new(@brand)
        @create_collection.perform
      end
      @brand
    }
  end
end
