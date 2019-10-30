Shop.where("accepted_terms_and_conditions_at IS NULL").each do |shop|
  shop.update!(accepted_terms_and_conditions_at: Time.now.utc)
end
