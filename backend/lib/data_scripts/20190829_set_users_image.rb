User.where.not(img_url: [nil, ""]).each { |user| Image.find_by(url: user.img_url).update!(user: user) }
