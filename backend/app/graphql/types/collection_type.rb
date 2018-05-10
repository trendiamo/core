Types::CollectionType = GraphQL::ObjectType.define do
  name "CollectionType"

  field :id, !types.ID
  field :handle, !types.String
  field :title, !types.String
  field :type, !types.String
  field :profilePicUrl, !types.String do
    resolve ->(obj, _args, _ctx) { obj.profile_pic_url }
  end
  field :coverPicUrl, !types.String do
    resolve ->(obj, _args, _ctx) { obj.cover_pic_url }
  end
  field :description, !types.String
  field :fencedCollection, Types::FencedCollectionType do
    resolve ->(obj, _args, _ctx) do
      obj.fenced_collection
    end
  end
  field :collectionModal, Types::CollectionModalType do
    resolve ->(obj, _args, _ctx) do
      obj.collection_modal
    end
  end
end
