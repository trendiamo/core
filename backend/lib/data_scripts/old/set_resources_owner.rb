# rubocop:disable Rails/SkipsModelValidations
Outro.update_all(owner_id: User.find_by(email: "dw@trendiamo.com").id)
SimpleChat.update_all(owner_id: User.find_by(email: "dw@trendiamo.com").id)
Showcase.update_all(owner_id: User.find_by(email: "dw@trendiamo.com").id)
# rubocop:enable Rails/SkipsModelValidations
