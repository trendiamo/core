# Script that adds "stop" and "reset" type chat options to each account

resets = {
  'Impressorajato': "Legal! Quero saber mais!",
  'Corinthians': "Me mostre outras sugestões",
  'Shopinfo': "Me mostre outras sugestões",
  'Shopinfo2': "Me mostre outras sugestões",
  'Eotica': "Quero saber mais",
  'RiHappy': "Preciso saber mais",
  '_default': "I still need help",
}

stops = {
  'Impressorajato': "Quero falar com um consultor",
  'Corinthians': "Legal",
  'Shopinfo': "Legal",
  'Shopinfo2': "Legal",
  'Eotica': "Legal, gostei!",
  'RiHappy': "Ok, otimo",
  '_default': "Ok, cool",
}

accounts = Account.all

accounts.each do |account|
  current_stop = stops[account.name.to_sym] || stops[:_default]
  current_reset = resets[account.name.to_sym] || resets[:_default]
  ActsAsTenant.default_tenant = account
  account.chat_steps.each do |chat_step|
    if chat_step.chat_options.all.length.zero?
      chat_step.chat_options.create!(text: current_reset, order: 1, action_type: "reset")
      chat_step.chat_options.create!(text: current_stop, order: 2, action_type: "stop")
    end
  end
end
