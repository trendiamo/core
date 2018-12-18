class Populate
  def self.process
    new.process
  end

  def process
    create_account
    create_websites
    create_users
    create_personas
    create_outros
    create_scripted_chats
    create_curations
    create_triggers
  end

  private

  def team_members
    [
      { email: "db", name: "David Bennett" },
      { email: "dh", name: "Dylan Henderson" },
      { email: "frb", name: "Fabian Brooks" },
      { email: "mc", name: "Michael Campbell" },
    ]
  end

  def create_account
    ActsAsTenant.default_tenant = Account.create!(name: "Trendiamo")
  end

  def create_websites
    Website.create!(name: "Demo", hostnames: %w[demo.trendiamo.com])
  end

  def create_users
    users_attrs = team_members.map do |team_member|
      {
        email: "#{team_member[:email]}@trendiamo.com",
        first_name: team_member[:name].split(" ")[0],
        last_name: team_member[:name].split(" ")[1],
        password: "password", password_confirmation: "password",
        confirmed_at: Time.now,
      }
    end
    User.create!(users_attrs)
  end

  def create_personas
    22.times do |i|
      persona_attrs = {
        name: Faker::RickAndMorty.character,
        description: Faker::RickAndMorty.quote,
        profile_pic_url: "https://randomuser.me/api/portraits/men/#{i % 99}.jpg",
      }
      Persona.create!(persona_attrs)
    end
  end

  def create_outros
    3.times do
      outro_attrs = {
        name: "#{Faker::Lorem.word} Outro",
        persona: Persona.order("RANDOM()").first,
      }
      Outro.create!(outro_attrs)
    end
  end

  def create_scripted_chats
    9.times do
      scripted_chat_attrs = {
        name: "#{Faker::Lorem.word} Chat",
        persona: Persona.order("RANDOM()").first,
        title: "Hello there",
      }
      ScriptedChat.create!(scripted_chat_attrs)
    end
  end

  def create_curations
    3.times do
      curation_attrs = {
        name: "#{Faker::Lorem.word} Curation",
        persona: Persona.order("RANDOM()").first,
        title: Faker::Lorem.sentence,
        subtitle: Faker::Lorem.sentence,
      }
      Curation.create!(curation_attrs)
    end
  end

  def create_triggers
    11.times do |i|
      trigger_attrs = {
        order: i + 1,
        flow: [Curation, ScriptedChat, Outro].sample.all.sample,
        url_matchers: Array.new(rand(1...5)).map { "/" + Faker::Internet.slug(Faker::Lorem.words(2).join("-")) },
      }
      Trigger.create!(trigger_attrs)
    end
  end
end
