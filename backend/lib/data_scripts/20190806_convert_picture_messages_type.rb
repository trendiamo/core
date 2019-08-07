chain = SimpleChatMessage.where(type: "SimpleChatPictureMessage")
chain.update_all(type: "SimpleChatImageMessage") # rubocop:disable Rails/SkipsModelValidations
