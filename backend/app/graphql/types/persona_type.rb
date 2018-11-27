Types::PersonaType = GraphQL::ObjectType.define do
  name "Persona"

  field :id, !types.ID
  field :name, !types.String
  field :description, !types.String
  field :profilePic, Types::PicType do
    resolve ->(obj, _args, _ctx) { { url: obj.profile_pic_url } }
  end
end
