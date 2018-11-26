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
      { account: @account, email: "#{initials}@trendiamo.com", password: "password", password_confirmation: "password" }
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
    outro_attrs = {
      account: account,
      persona: Persona.order("RANDOM()").first,
    }
    30.times do
      Outro.create!(outro_attrs)
    end
  end

  def create_scripted_chats
    scripted_chat_attrs = {
      account: @account,
      persona: Persona.order("RANDOM()").first,
      title: "Hello there",
    }

    30.times do
      ScriptedChat.create!(scripted_chat_attrs)
    end
  end

  def create_curations
    curation_attrs = {
      account: @account,
      persona: Persona.order("RANDOM()").first,
      title: Faker::Lorem.sentence,
      subtitle: Faker::Lorem.sentence,
    }

    30.times do
      Curation.create!(curation_attrs)
    end
  end
end
