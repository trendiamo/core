class Bubble::CollectionsController < BubbleController
  def create
    @create_collection = Bubble::CreateCollection.new(collection_params)
    if @create_collection.perform
      render json: @create_collection, status: :created
    else
      render json: { errors: @create_collection.errors }, status: :unprocessable_entity
    end
  end

  def index
    collections = Collection.select(:id, :handle, :description, :profile_pic_url).all.map(&:attributes)
    add_fence_info(collections)
    add_modal_info(collections)
    render json: collections
  end

  def show
    @collection = Collection.find(params[:id])
    render json: @collection, include: %i[collection_modal fenced_collection]
  end

  def update
    @collection = Collection.find(params[:id])
    if @collection.update(collection_params)
      render json: @collection, include: %i[collection_modal fenced_collection]
    else
      render json: { errors: @collection.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    Collection.find(params[:id]).destroy
    render json: { ok: true }
  end

  private

  def add_fence_info(collections)
    collection_ids = collections.map { |c| c["id"] }
    collection_ids_with_fence = FencedCollection.where(collection_id: collection_ids).pluck(:collection_id)
    collections.map do |collection|
      collection[:has_fence] = collection_ids_with_fence.find { |cid| cid == collection["id"] } ? true : false
    end
  end

  def add_modal_info(collections)
    collection_ids = collections.map { |c| c["id"] }
    collection_ids_with_modal = CollectionModal.where(collection_id: collection_ids).pluck(:collection_id)
    collections.map do |collection|
      collection[:has_modal] = collection_ids_with_modal.find { |cid| cid == collection["id"] } ? true : false
    end
  end

  def collection_params
    fenced_collection_attributes = %i[id domain_name favicon_url _destroy]
    collection_modal_attributes = %i[id logo_pic_url cover_pic_url title text cta_text _destroy]
    params.require(:collection).permit(:handle, :title, :type, :profile_pic_url, :cover_pic_url, :description,
                                       fenced_collection_attributes: fenced_collection_attributes,
                                       collection_modal_attributes: collection_modal_attributes)
  end
end
