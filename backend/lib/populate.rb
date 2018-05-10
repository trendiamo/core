users_attrs = [
  { username: "dsgh", email: "dh@trendiamo.com", password: "password", password_confirmation: "password" },
  { username: "dantheman", email: "dw@trendiamo.com", password: "password", password_confirmation: "password" },
  { username: "mariedahmen", email: "md@example.com", password: "password", password_confirmation: "password" },
]
User.create!(users_attrs)

products_attrs = [
  { product_ref: "1006456242219", user: User.find_by(username: "dantheman") },
  { product_ref: "784541843499", user: User.find_by(username: "mariedahmen") },
  { product_ref: "784538304555", user: User.find_by(username: "mariedahmen") },
  { product_ref: "784512516139", user: User.find_by(username: "mariedahmen") },
  { product_ref: "783379071019", user: User.find_by(username: "mariedahmen") },
]
Product.create!(products_attrs)

collections_attrs = [
  {
    type: "brand",
    handle: "scotch-soda",
    title: "Scotch & Soda",
    profile_pic_url: "https://placeimg.com/750/444/people",
    cover_pic_url: "https://placeimg.com/160/160/people",
    description: "Girl, you're all set!\nCollection's out now",
  },
  {
    type: "influencer",
    handle: "mariedahmen",
    title: "mariedahmen",
    profile_pic_url: "https://placeimg.com/750/444/people",
    cover_pic_url: "https://placeimg.com/160/160/people",
    description: "Düsseldorf - Germany\n@mariedahmen on Instagram",
  },
  {
    type: "influencer",
    handle: "dantheman",
    title: "dantheman",
    profile_pic_url: "https://placeimg.com/750/444/people",
    cover_pic_url: "https://placeimg.com/160/160/people",
    description: "Lisbon - Portugal\nResident DJ",
  },
]
Collection.create!(collections_attrs)

# rubocop:disable Metrics/LineLength
comments_attrs = [
  { user: User.find_by(username: "dsgh"), product: Product.find_by(product_ref: "1006456242219"), content: "Oldest comment here." },
  { user: User.find_by(username: "dsgh"), product: Product.find_by(product_ref: "1006456242219"), content: "Pinned comment", pinned: true },
  { user: User.find_by(username: "dsgh"), product: Product.find_by(product_ref: "1006456242219"), content: "Upvoted comment" },
  { user: User.find_by(username: "mariedahmen"), product: Product.find_by(product_ref: "1006456242219"), content: "Recent comment" },
  { user: User.find_by(username: "dantheman"), product: Product.find_by(product_ref: "1006456242219"), content: "Hey guys, it's me ya boy. This product is lit" },
]
# rubocop:enable Metrics/LineLength
Comment.create!(comments_attrs)

upvotes_attrs = [
  { user: User.find_by(username: "dantheman"), comment: Comment.find_by(content: "Upvoted comment") },
]
Upvote.create!(upvotes_attrs)

collection_modal_attrs = {
  collection: Collection.find_by(handle: "dantheman"),
  logo_pic_url: "//cdn.shopify.com/s/files/1/0024/7522/9242/files/alexv_logo_240x240.png",
  cover_pic_url: "//cdn.shopify.com/s/files/1/0024/7522/9242/files/popup.jpg",
  title: "Offizieller Merchandise von AlexV",
  text: "<p>Streng limitiert auf 150 Teile</p><p>Shop-Eröffnung 28.04.2018</p>",
  cta_text: "Jetzt Shoppen",
}
CollectionModal.create!(collection_modal_attrs)

fenced_collection_attrs = {
  collection: Collection.find_by(handle: "dantheman"),
  domain_name: "dantheman.shop",
}
FencedCollection.create!(fenced_collection_attrs)
