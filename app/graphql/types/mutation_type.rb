Types::MutationType = GraphQL::ObjectType.define do
  name "Mutation"

  field :toggleLike, Types::ProductType do
    argument :productRef, !types.String
    resolve Resolver.new ->(obj, args, ctx) {
      use(Plugins::Pundit, obj: obj, args: args, ctx: ctx)

      @product = Product.new(product_ref: args[:productRef])
      authorize(@product)
      like = Like.find_by(product_ref: args[:productRef], customer_ref: ctx[:current_user].customer_ref)
      if like
        like.destroy!
      else
        Like.create!(product_ref: args[:productRef], customer_ref: ctx[:current_user].customer_ref)
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

  field :toggleUpvote, Types::CommentType do
    argument :commentId, !types.ID
    resolve Resolver.new ->(obj, args, ctx) {
      use(Plugins::Pundit, obj: obj, args: args, ctx: ctx)

      @comment = Comment.find(args[:commentId])
      authorize(@comment)
      upvote = Upvote.find_by(comment: @comment, user: ctx[:current_user])
      if upvote
        upvote.destroy!
      else
        Upvote.create!(comment: @comment, user: ctx[:current_user])
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
      inappropriate_flag = InappropriateFlag.find_by(comment: @comment, user: ctx[:current_user])
      InappropriateFlag.create!(comment: @comment, user: ctx[:current_user]) unless inappropriate_flag
      @comment.reload
    }
  end
end
