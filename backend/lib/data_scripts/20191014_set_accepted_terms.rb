User.where("affiliate_role > 0 AND accepted_terms_and_conditions_at IS NULL").each do |user|
  user.update!(accepted_terms_and_conditions_at: Time.now.utc)
end
