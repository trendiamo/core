MutationType = GraphQL::ObjectType.define do
  name "Mutation"

  field :createUser, function: Resolvers::CreateUser.new
  field :signinUser, function: Resolvers::SignInUser.new
  field :signoutUser, function: Resolvers::SignOutUser.new
end
