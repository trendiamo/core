class Populate
  def self.process
    new.process
  end

  def process
    create_accounts
    create_websites
    create_users
    create_personas
    create_outros
    create_scripted_chats
    create_curations
    create_triggers
  end

  def create_accounts
    @account = Account.create!(name: "Trendiamo")
    ActsAsTenant.default_tenant = @account
  end

  def create_websites
    Website.create!(account: @account, name: "Demo", hostnames: %w[demo.trendiamo.com])
  end

  def create_users
    team_members_initials = %w[db dh frb mc]
    users_attrs = team_members_initials.map do |initials|
      { account: @account, email: "#{initials}@trendiamo.com", password: "password", password_confirmation: "password",
        confirmed_at: Time.now, }
    end
    User.create!(users_attrs)
  end

  def create_personas
    60.times do |i|
      persona_attrs = {
        account: @account,
        name: Faker::RickAndMorty.character,
        description: Faker::RickAndMorty.quote,
        profile_pic_url: "https://randomuser.me/api/portraits/men/#{i % 99}.jpg",
      }
      Persona.create!(persona_attrs)
    end
  end

  def create_outros
    30.times do
      outro_attrs = {
        account: @account,
        persona: Persona.order("RANDOM()").first,
      }
      Outro.create!(outro_attrs)
    end
  end

  def create_scripted_chats
    30.times do
      scripted_chat_attrs = {
        account: @account,
        persona: Persona.order("RANDOM()").first,
        title: "Hello there",
      }
      ScriptedChat.create!(scripted_chat_attrs)
    end
  end

  def create_curations
    30.times do
      curation_attrs = {
        account: @account,
        persona: Persona.order("RANDOM()").first,
        title: Faker::Lorem.sentence,
        subtitle: Faker::Lorem.sentence,
      }
      Curation.create!(curation_attrs)
    end
  end

  def urls_array
    Array.new(rand(1...5)).map do
      "/" + Faker::Internet.slug(Faker::Lorem.words(2).join("-"))
    end
  end

  def create_triggers
    8.times do |i|
      trigger_attrs = {
        account: @account,
        order: i + 1,
        name: Faker::App.name,
        flow: [Curation, ScriptedChat, Outro].sample.all.sample,
        url_matchers: urls_array,
      }
      Trigger.create!(trigger_attrs)
    end
  end
end
