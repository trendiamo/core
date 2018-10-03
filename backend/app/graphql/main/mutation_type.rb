Main::MutationType = GraphQL::ObjectType.define do
  name "Mutation"

  field :toggleLike, Fields::ToggleLikeField
  field :addComment, Fields::AddCommentField
  field :togglePinComment, Fields::TogglePinCommentField
  field :toggleUpvote, Fields::ToggleUpvoteField
  field :flag, Fields::FlagField
  field :removeComment, Fields::RemoveCommentField
  field :addBrand, Fields::AddBrandField
  field :updateBrand, Fields::UpdateBrandField
  field :deleteProducts, Fields::DeleteProductsField

  field :createExposition, Fields::CreateExpositionField
  field :updateExposition, Fields::UpdateExpositionField
end
