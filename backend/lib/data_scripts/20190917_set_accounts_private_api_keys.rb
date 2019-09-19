Account.where(private_api_key: [nil, ""]).each do |account|
  account.update!(private_api_key: SecureRandom.base58)
end
