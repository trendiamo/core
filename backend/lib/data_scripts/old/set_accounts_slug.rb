Account.where(slug: "").each { |account| account.update!(slug: account.name.parameterize) }
