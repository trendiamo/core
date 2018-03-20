CommentInputType = GraphQL::InputObjectType.define do
  name "CommentInputType"

  argument :productRef, !types.String
  argument :content, !types.String
end

Types::MutationType = GraphQL::ObjectType.define do
  name "Mutation"

  field :toggleLike, Types::ProductType do
    argument :productRef, !types.String
    resolve ->(_obj, args, ctx) {
      @product = OpenStruct.new(product_ref: args[:productRef])
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
    argument :comment, !CommentInputType

    resolve ->(_obj, args, ctx) {
      Comment.create!(args[:comment].to_h.transform_keys { |key| key.to_s.underscore }.merge(user: ctx[:current_user]))
    }
  end

  field :toggleUpvote, Types::CommentType do
    argument :commentId, !types.ID
    resolve ->(_obj, args, ctx) {
      @comment = Comment.find(args[:commentId])
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
    resolve ->(_obj, args, ctx) {
      @comment = Comment.find(args[:commentId])
      inappropriate_flag = InappropriateFlag.find_by(comment: @comment, user: ctx[:current_user])
      InappropriateFlag.create!(comment: @comment, user: ctx[:current_user]) unless inappropriate_flag
      @comment.reload
    }
  end
end
