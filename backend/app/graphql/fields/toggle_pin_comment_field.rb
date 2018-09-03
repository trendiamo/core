Fields::TogglePinCommentField = GraphQL::Field.define do
  name "Toggle Pin Comment"
  type Types::CommentType
  argument :commentId, !types.ID
  resolve Resolver.new ->(obj, args, ctx) {
    use(Plugins::Pundit, obj: obj, args: args, ctx: ctx)

    @comment = Comment.find(args[:commentId])
    authorize(@comment)
    @comment.update!(pinned: !@comment.pinned)
    @comment
  }
end
