FactoryBot.define do
  factory :image, aliases: %i[img] do
    sequence(:url) { |i| "#{Faker::LoremPixel.image}?i=#{i}" }

    factory :picture do
      sequence(:url) { |i| "https://randomuser.me/api/portraits/men/#{i % 99}.jpg" }
    end

    file_format "jpeg"

    after(:build) { |record| record.account = ActsAsTenant.default_tenant }
  end
end
