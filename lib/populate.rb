users_attrs = [
  { username: "dsgh", email: "dh@trendiamo.com", password: "password", password_confirmation: "password" },
  { username: "dantheman", email: "dw@trendiamo.com", password: "password", password_confirmation: "password" },
  { username: "mariedahmen", email: "md@example.com", password: "password", password_confirmation: "password" },
]
User.create!(users_attrs)

# rubocop:disable Metrics/LineLength
collections_attrs = [
  {
    type: "brand",
    handle: "scotch-soda",
    title: "Scotch & Soda",
    profile_pic_url: "https://vignette.wikia.nocookie.net/cocktails/images/b/b7/Images.jpg/revision/latest?cb=20110513194131",
    cover_pic_url: "http://www.dresscodeclothing.com/blog/wp-content/uploads/2014/05/zzzScotch-Soda-Logo.jpg",
    description: "Girl, you're all set!\nCollection's out now",
  },
  {
    type: "influencer",
    handle: "mariedahmen",
    title: "mariedahmen",
    profile_pic_url: "https://www.bellazon.com/main/uploads/monthly_2018_02/Marie-Sedcard-Fashion-Beauty-Editorial-Commercial-Tv79.jpg.fce402dd1720d0ad8e36ef0d0c124eea.jpg",
    cover_pic_url: "https://cocainemodels.com/wp-content/uploads/2018/01/marie-dahmen-shooting-apartment-rental-hotel-photo-video-spot-berlin-fashion-week-1030x515.jpg",
    description: "Düsseldorf - Germany\n@mariedahmen on Instagram",
  },
  {
    type: "influencer",
    handle: "dantheman",
    title: "dantheman",
    profile_pic_url: "http://offoffpod.com/wp-content/uploads/2014/01/bittrich_fake_mugshot.jpg",
    cover_pic_url: "http://www.edmmagazine.com/wp-content/uploads/2015/04/main1.jpg",
    description: "Lisbon - Portugal\nResident DJ",
  },
]
# rubocop:enable Metrics/LineLength
Collection.create!(collections_attrs)
