class AutocompletesController < RestAdminController
  def personas_autocomplete
    authorize :autocomplete
    @personas = Persona.where("name ILIKE ?", "#{params[:searchQuery]}%")
    render json: @personas
  end

  def flows_autocomplete
    authorize :autocomplete
    @flows = [SimpleChat, Outro, Showcase, Navigation].map do |type|
      type.where("name ILIKE ?", "#{params[:searchQuery]}%")
    end.flatten
    render json: @flows
  end

  def path_autocomplete
    authorize :autocomplete
    @steps = [SimpleChat, Outro, Showcase, Navigation].map do |type|
      type.where("name ILIKE ?", "#{params[:searchQuery]}%")
    end.flatten
    render json: @steps.map(&:paths).flatten
  end
end
