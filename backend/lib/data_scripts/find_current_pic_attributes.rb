personas = Persona.where.not(profile_pic_url: [nil, ""], profile_pic_id: [nil]); nil
personas_of_interest = personas.select { |p| p.read_attribute(:profile_pic_url) != Picture.find(p.profile_pic_id).url }

account_ids = personas_of_interest.pluck(:account_id).uniq; nil
Account.where(id: account_ids).pluck(:name).sort.uniq
# ["PierreCardinGermany", "PierreCardinGermanyPreAsmt", "Test account"]

product_picks = ProductPick.where.not(pic_url: [nil, ""], pic_id: [nil]); nil
product_picks_of_interest = product_picks.select { |p| p.read_attribute(:pic_url) != Picture.find(p.pic_id).url }

account_ids = product_picks_of_interest.pluck(:account_id).uniq; nil
Account.where(id: account_ids).pluck(:name).sort.uniq
# ["Buttwrap", "Test account"]

navigation_items = NavigationItem.where.not(pic_url: [nil, ""], pic_id: [nil]); nil
navigation_items_of_interest = navigation_items.select { |p| p.pic_url != Picture.find(p.pic_id).url }

# 0
# account_ids = product_picks_of_interest.pluck(:account_id).uniq; nil
# Account.where(id: account_ids).pluck(:name).sort.uniq
