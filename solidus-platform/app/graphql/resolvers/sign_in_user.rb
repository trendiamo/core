class Resolvers::SignInUser < GraphQL::Function
  argument :email, types.String
  argument :password, types.String

  type do
    name "SignInPayload"

    field :authentication_token, types.String
    field :user, Types::UserType
  end

  def call(_obj, args, ctx)
    return unless args[:email]
    user = Spree::User.find_by email: args[:email]
    return unless user
    return unless user.valid_password?(args[:password])
    token = Tiddle.create_and_return_token(user, ctx[:request])
    ctx[current_user: user]
    OpenStruct.new({ user: user, authentication_token: token })
  end
end
