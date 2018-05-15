FactoryBot.define do
  factory :collection_modal do
    collection factory: :collection
    logo_pic_url "https://placeimg.com/480/480/tech"
    cover_pic_url "https://placeimg.com/640/360/arch"
    title "This is the title"
    text "This is the text"
    cta_text "Call to action"
  end
end
