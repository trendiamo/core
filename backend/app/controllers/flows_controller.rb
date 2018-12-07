class FlowsController < RestController
  def index
    @scripted_chats = ScriptedChat.all
    @outros = Outro.all
    @curations = Curation.all
    authorize :flow
    render json: @scripted_chats + @outros + @curations
  end
end
