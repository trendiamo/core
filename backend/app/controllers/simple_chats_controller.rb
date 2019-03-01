class SimpleChatsController < RestController
  def index
    @simple_chats = SimpleChat.includes(:persona).all
    authorize @simple_chats
    chain = sorting(pagination(@simple_chats))
    render json: chain
  end

  def destroy
    @simple_chats = SimpleChat.where(id: params[:ids])
    authorize @simple_chats
    if @simple_chats.destroy_all
      render json: { data: @simple_chats }
    else
      render_error
    end
  end

  def create
    @simple_chat = SimpleChat.new(simple_chat_params)
    authorize @simple_chat
    if @simple_chat.save
      render json: @simple_chat.as_json, status: :created
    else
      render_error
    end
  end

  def show
    @simple_chat = SimpleChat.find(params[:id])
    authorize @simple_chat
    render json: @simple_chat.as_json
  end

  def update
    @simple_chat = SimpleChat.find(params[:id])
    authorize @simple_chat
    if @simple_chat.update(simple_chat_params)
      render json: @simple_chat
    else
      render_error
    end
  end

  def duplicate
    @simple_chat = SimpleChat.find(params[:id])
    authorize @simple_chat
    @cloned_simple_chat = @simple_chat.deep_clone include: { simple_chat_steps: :simple_chat_messages }
    @cloned_simple_chat.name = "Copied from - " + @cloned_simple_chat.name
    if @cloned_simple_chat.save
      render json: @cloned_simple_chat, status: :created
    else
      render_error
    end
  end

  private

  def simple_chat_params
    result = params.require(:simple_chat).permit(:id, :name, :title, :chat_bubble_text, :persona_id, :_destroy,
                                                 simple_chat_steps_attributes:
                                                 [:id, :key, :_destroy, :order, simple_chat_messages_attributes:
                                                  %i[id order text _destroy],])

    add_order_fields(result[:simple_chat_steps_attributes])
    result
  end

  # add order fields to chat_step_attributes' messages and options, based on received order
  def add_order_fields(simple_chat_steps_attributes)
    return unless simple_chat_steps_attributes
    simple_chat_steps_attributes&.each_with_index do |chat_step_attributes, i|
      chat_step_attributes[:order] = i + 1
      next unless chat_step_attributes[:simple_chat_messages_attributes]
      chat_step_attributes[:simple_chat_messages_attributes]&.each_with_index do |chat_message_attributes, l|
        chat_message_attributes[:order] = l + 1
      end
    end
  end

  def render_error
    errors = @simple_chat.errors.full_messages.map { |string| { title: string } }
    render json: { errors: errors }, status: :unprocessable_entity
  end
end
