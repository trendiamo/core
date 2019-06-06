User.where.not(account_id: nil).count.map do |user|
  Membership.destroy_all
  Membership.create!(account_id: user.account_id, user_id: user.id, role: user.role)
end