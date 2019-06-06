Membership.destroy_all
User.where.not(account_id: nil).map do |user|
  Membership.create!(account_id: user.account_id, user_id: user.id, role: user.role)
end
