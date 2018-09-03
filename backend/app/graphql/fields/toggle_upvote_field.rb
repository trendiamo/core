Fields::ToggleUpvoteField = GraphQL::Field.define do
  name "Toggle Upvote"
  type Types::CommentType
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
