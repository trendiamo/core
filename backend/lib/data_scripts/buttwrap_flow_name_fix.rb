# rubocop:disable Metrics/LineLength

adam = Persona.find_by(name: "Adam Jakubowski")
james = Persona.find_by(name: "James Kindle")
oscar = Persona.find_by(name: "Oscar Cuenca")

main_curation = Curation.where(persona_id: adam.id).first

adam_outro = adam.outros.first

adam_chats = ScriptedChat.where(persona_id: adam.id)
james_chats = ScriptedChat.where(persona_id: james.id)
oscar_chats = ScriptedChat.where(persona_id: oscar.id)

adam_chats[0].update(name: "Adam EBW Chat")
adam_chats[1].update(name: "Adam OBR Chat")
adam_chats[2].update(name: "Adam BGM Chat")

james_chats[0].update(name: "James OBR Chat")
james_chats[1].update(name: "James BG Chat")
james_chats[2].update(name: "James BGM Chat")

oscar_chats[0].update(name: "Oscar GBB Chat")
oscar_chats[1].update(name: "Oscar EBW Chat")
oscar_chats[2].update(name: "Oscar BW Chat")

adam_outro.update(name: "Adam Outro")

main_curation.update(name: "Main Curation")

# rubocop:enable Metrics/LineLength
