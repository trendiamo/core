Website.where.not(id: WebsiteSettings.pluck(:website_id)).map do |website|
  website.update!(website_settings_attributes: [{ account_id: website.account_id }])
end
