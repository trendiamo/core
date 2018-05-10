class Bubble::FencedCollectionsController < BubbleController
  def create
    @fenced_collection = FencedCollection.new(fenced_collection_params)
    if @fenced_collection.save
      render json: @fenced_collection, status: :created
    else
      render json: { errors: @fenced_collection.errors }, status: :unprocessable_entity
    end
  end

  private

  def fenced_collection_params
    params.require(:fenced_collection).permit(:domain_name, :favicon_url)
  end
end
