class ScriptedChatsController < ApplicationController
  def index
    @scripted_chats = ScriptedChat.includes(:persona).all
    authorize @scripted_chats
    render json: sorting(pagination(@scripted_chats))
  end

  def destroy
    @scripted_chats = ScriptedChat.where(id: params[:ids])
    authorize @scripted_chats
    if @scripted_chats.destroy_all
      render json: { data: @scripted_chats }
    else
      render_error
    end
  end

  private

  def render_error
    errors = @scripted_chat.errors.full_messages.map { |string| { title: string } }
    render json: { errors: errors }, status: :unprocessable_entity
  end
end
