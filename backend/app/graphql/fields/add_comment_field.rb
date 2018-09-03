Fields::AddCommentField = GraphQL::Field.define do
  name "Add Comment"
  type Types::CommentType
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
