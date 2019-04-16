Fields::MeField = GraphQL::Field.define do
  name "me"
  description "The currently logged user"
  type Types::UserType
  resolve Resolver.new(->(obj, args, ctx) {
    use(Plugins::Pundit, obj: obj, args: args, ctx: ctx)
    authorize(:me)

    current_user
  })
end
