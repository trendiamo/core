Fields::FlagField = GraphQL::Field.define do
  name "Flag"
  type Types::CommentType
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
