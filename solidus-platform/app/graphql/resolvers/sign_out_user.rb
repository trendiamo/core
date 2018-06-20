class Resolvers::SignOutUser < GraphQL::Function
  argument :email, types.String
  argument :password, types.String

  type do
    name "SignOutPayload"
    field :authentication_token, types.String
    field :user, Types::UserType
  end

  def call(_obj, args, ctx)
    return unless args[:email]
    user = Spree::User.find_by email: args[:email]
    return unless user
    return unless user.valid_password?(args[:password])
    Tiddle.expire_token(ctx[:current_user], ctx[:request]) if ctx[:current_user]
    OpenStruct.new(user: user, authentication_token: nil)
  end
end
