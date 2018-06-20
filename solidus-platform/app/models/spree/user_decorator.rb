Spree::User.class_eval do
  has_many :authentication_tokens
  devise :database_authenticatable, :registerable,
         :recoverable, :trackable, :validatable,
         :token_authenticatable
end
