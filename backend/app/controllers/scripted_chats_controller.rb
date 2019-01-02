class ScriptedChatsController < RestController
  def index
    @scripted_chats = ScriptedChat.includes(:persona).all
    authorize @scripted_chats
    chain = sorting(pagination(@scripted_chats))
    render json: chain
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

  def create
    @scripted_chat = ScriptedChat.new(scripted_chat_params)
    authorize @scripted_chat
    if @scripted_chat.save
      render json: @scripted_chat.as_json, status: :created
    else
      render_error
    end
  end

  def show
    @scripted_chat = ScriptedChat.find(params[:id])
    authorize @scripted_chat
    render json: @scripted_chat.as_json
  end

  def update
    @scripted_chat = ScriptedChat.find(params[:id])
    authorize @scripted_chat
    if @scripted_chat.update(scripted_chat_params)
      render json: @scripted_chat
    else
      render_error
    end
  end

  private

  def scripted_chat_params
    params.require(:scripted_chat).permit(:id, :name, :title, :persona_id, chat_step_attributes: {})
  end

  def render_error
    errors = @scripted_chat.errors.full_messages.map { |string| { title: string } }
    render json: { errors: errors }, status: :unprocessable_entity
  end
end
