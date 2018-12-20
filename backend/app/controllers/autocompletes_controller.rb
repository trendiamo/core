class AutocompletesController < RestController
  def personas_autocomplete
    @personas = Persona.where("name ILIKE ?", "#{params[:searchQuery]}%")
    authorize :autocomplete
    render json: @personas
  end

  def flows_autocomplete
    @scripted_chats = ScriptedChat.where("name ILIKE ?", "#{params[:searchQuery]}%")
    @outros = Outro.where("name ILIKE ?", "#{params[:searchQuery]}%")
    @curations = Curation.where("name ILIKE ?", "#{params[:searchQuery]}%")
    authorize :autocomplete
    render json: @scripted_chats + @outros + @curations
  end

  def chat_steps_autocomplete
    @chat_steps = ChatStep.joins(:chat_messages).where("chat_messages.text ILIKE ?", "#{params[:searchQuery]}%")
    authorize :autocomplete
    render json: @chat_steps
  end
end
