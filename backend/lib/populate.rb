team_members_initials = %w[db dh fb mc]
users_attrs = team_members_initials.map do |initials|
  { email: "#{initials}@trendiamo.com", password: "password", password_confirmation: "password" },
end
User.create!(users_attrs)
