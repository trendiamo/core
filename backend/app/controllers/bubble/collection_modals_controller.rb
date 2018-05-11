class Bubble::CollectionModalsController < BubbleController
  def create
    @collection_modal = CollectionModal.new(collection_modal_params)
    if @collection_modal.save
      render json: @collection_modal, status: :created
    else
      render json: { errors: @collection_modal.errors }, status: :unprocessable_entity
    end
  end

  private

  def collection_modal_params
    params.require(:collection_modal).permit(:collection_id, :logo_pic_url, :cover_pic_url, :title, :text, :cta_text)
  end
end
