class AutocompletesController < RestController
  def personas_autocomplete
    authorize :autocomplete
    @personas = Persona.where("name ILIKE ?", "#{params[:searchQuery]}%")
    render json: @personas
  end

  def flows_autocomplete
    authorize :autocomplete
    @flows = [ScriptedChat, Outro, Curation, Navigation].map do |type|
      type.where("name ILIKE ?", "#{params[:searchQuery]}%")
    end.flatten
    render json: @flows
  end
end
