class FlowsController < RestController
  def index
    authorize :flow
    @scripted_chats = ScriptedChat.all
    @outros = Outro.all
    @showcases = Showcase.all
    @navigations = Navigation.all
    render json: @scripted_chats + @outros + @showcases + @navigations
  end
end
