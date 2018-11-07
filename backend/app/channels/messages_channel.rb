class MessagesChannel < ApplicationCable::Channel
  def subscribed
    stream_for "conversation_#{params[:visitor_ref]}"
  end

  def unsubscribed; end

  def new_message(message)
    MessagesChannel.broadcast_to("conversation_#{params[:visitor_ref]}", message.with_indifferent_access)
  end
end
