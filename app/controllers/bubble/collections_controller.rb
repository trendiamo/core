class Bubble::CollectionsController < BubbleController
  def create
    @create_collection = Bubble::CreateCollection.new(collection_params)
    if @create_collection.perform
      render json: @create_collection, status: :created
    else
      render json: { errors: @create_collection.errors }, status: :unprocessable_entity
    end
  end

  private

  def collection_params
    params.require(:collection).permit(:handle, :title, :profile_pic_url, :cover_pic_url, :description)
  end
end
