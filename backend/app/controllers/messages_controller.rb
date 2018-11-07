class MessagesController < ApplicationController
  def create
    message = Message.new(message_params)
    if message.save
      head :ok
    else
      head :bad_request
    end
  end

  private

  def message_params
    params.require(:message).permit(:body, :conversation_id)
  end
end
