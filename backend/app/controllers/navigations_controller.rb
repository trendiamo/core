class NavigationsController < RestController
  def index
    @navigations = Navigation.includes(:persona).all
    authorize @navigations
    chain = sorting(pagination(@navigations))
    render json: chain
  end

  def create
    @navigation = Navigation.new(navigation_params)
    authorize @navigation
    if @navigation.save
      render json: @navigation, status: :created
    else
      render_error
    end
  end

  def show
    @navigation = Navigation.find(params[:id])
    authorize @navigation
    render json: @navigation
  end

  def update
    @navigation = Navigation.find(params[:id])
    authorize @navigation
    if @navigation.update(navigation_params)
      render json: @navigation
    else
      render_error
    end
  end

  def destroy
    @navigations = Navigation.where(id: params[:ids])
    authorize @navigations
    if @navigations.destroy_all
      render json: { data: @navigations }
    else
      render_error
    end
  end

  def duplicate
    @navigation = Navigation.find(params[:id])
    authorize @navigation
    @cloned_navigation = @navigation.deep_clone include: :navigation_items
    @cloned_navigation.name = "Copied from - " + @cloned_navigation.name
    if @cloned_navigation.save
      render json: @cloned_navigation, status: :created
    else
      render_error
    end
  end

  private

  def navigation_params
    result = params.require(:navigation).permit(:persona_id, :name, :title, :chat_bubble_text, :chat_bubble_extra_text,
                                                navigation_items_attributes:
      %i[id text url pic_url _destroy])
    add_order_fields(result)
  end

  # add order fields to navigation_attributes' navigation_items, based on received order
  def add_order_fields(navigation_attributes)
    return unless navigation_attributes
    navigation_attributes[:navigation_items_attributes]&.each_with_index do |navigation_item_attributes, i|
      navigation_item_attributes[:order] = i + 1
    end
    navigation_attributes
  end

  def render_error
    errors = @navigation.errors.full_messages.map { |string| { title: string } }
    render json: { errors: errors }, status: :unprocessable_entity
  end
end
