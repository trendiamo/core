class Resolvers::CreateUser < GraphQL::Function
  argument :email, types.String
  argument :password, types.String

  type Types::UserType

  def call(_obj, args, _ctx)
    Spree::User.create!(
      email: args[:email],
      password: args[:password]
    )
  end
end
