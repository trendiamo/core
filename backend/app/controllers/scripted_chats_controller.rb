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
    result = params.require(:scripted_chat).permit(:id, :name, :title, :action_type, :chat_bubble_text, :persona_id,
                                                   chat_step_attributes: {})
    add_order_fields(result[:chat_step_attributes])
    result
  end

  # add order fields to chat_step_attributes' messages and options, based on received order
  def add_order_fields(chat_step_attributes)
    return unless chat_step_attributes
    chat_step_attributes[:chat_messages_attributes]&.each_with_index do |chat_message_attributes, i|
      chat_message_attributes[:order] = i + 1
    end
    chat_step_attributes[:chat_options_attributes]&.each_with_index do |chat_option_attributes, i|
      chat_option_attributes[:order] = i + 1
      add_order_fields(chat_option_attributes[:destination_chat_step_attributes])
    end
  end

  def render_error
    errors = @scripted_chat.errors.full_messages.map { |string| { title: string } }
    render json: { errors: errors }, status: :unprocessable_entity
  end
end
