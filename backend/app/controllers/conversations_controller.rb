class ConversationsController < ApplicationController
  before_action :authenticate_user!

  def index
    conversations = Conversation.all
    render json: conversations
  end

  def create
    conversation = Conversation.new(conversation_params)
    if conversation.save
      # TODO: get this into the model
      # ActionCable.server.broadcast("conversations_channel", id: conversation.id)
      head :ok
    else
      head :bad_request
    end
  end

  private

  def conversation_params
    params.require(:conversation)
  end
end
