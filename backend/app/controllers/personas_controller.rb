class PersonasController < ApplicationController
  def index
    @personas = Persona.all
    authorize @personas
    render json: sorting(pagination(@personas))
  end

  def show
    @persona = Persona.find(params[:id])
    authorize @persona
    render json: @persona
  end

  def update
    @persona = Persona.find(params[:id])
    authorize @persona
    if @persona.update(persona_params)
      render json: @persona
    else
      render_error
    end
  end

  def create
    @persona = Persona.new(persona_params)
    authorize @persona
    if @persona.save
      render json: @persona, status: :created
    else
      render_error
    end
  end

  def destroy
    @personas = Persona.where(id: params[:ids])
    authorize @personas
    if @personas.destroy_all
      render json: { data: @personas }
    else
      render_error
    end
  end

  private

  def persona_params
    params.require(:persona).permit(:name, :description, :profile_pic_url)
  end

  def render_error
    errors = @persona.errors.full_messages.map { |string| { title: string } }
    render json: { errors: errors }, status: :unprocessable_entity
  end
end
