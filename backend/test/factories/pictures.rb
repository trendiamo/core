FactoryBot.define do
  factory :picture, aliases: %i[pic] do
    sequence(:url) { |i| "#{Faker::LoremPixel.image}?i=#{i}" }

    factory :profile_pic do
      sequence(:url) { |i| "https://randomuser.me/api/portraits/men/#{i % 99}.jpg" }
    end

    after(:build) { |record| record.account = ActsAsTenant.default_tenant }
  end
end
