class FlowsController < ApplicationController
  def index
    @scripted_chats = ScriptedChat.all
    @outros = Outro.all
    @curations = Curation.all
    authorize :flow
    render json: { scripted_chats: @scripted_chats, outros: @outros, curations: @curations }
  end
end
