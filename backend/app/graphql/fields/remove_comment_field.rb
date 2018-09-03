Fields::RemoveCommentField = GraphQL::Field.define do
  name "Remove Comment"
  type Types::CommentType
  argument :commentId, !types.ID
  resolve Resolver.new ->(obj, args, ctx) {
    use(Plugins::Pundit, obj: obj, args: args, ctx: ctx)

    @comment = Comment.find(args[:commentId])
    authorize(@comment)
    @comment.update!(removed_at: Time.now.utc) unless @comment.removed_at
    @comment
  }
end
