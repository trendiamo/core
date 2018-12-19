class FlowsController < RestController
  def index
    authorize :flow
    @scripted_chats = ScriptedChat.all
    @outros = Outro.all
    @curations = Curation.all
    @navigations = Navigation.all
    render json: @scripted_chats + @outros + @curations + @navigations
  end
end
