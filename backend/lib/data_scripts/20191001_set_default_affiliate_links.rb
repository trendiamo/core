Affiliation.includes(:affiliate_links).where(affiliate_links: { affiliation_id: nil }).each do |affiliation|
  affiliation.affiliate_links
             .create!(default_link: true,
                      url: "https://#{affiliation.account.websites.first.hostnames.first}/?aftk=#{affiliation.token}")
end
