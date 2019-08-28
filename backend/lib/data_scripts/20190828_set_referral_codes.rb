User.where(referral_code: nil).each do |user|
  user.set_referral_code
  user.save!
end
