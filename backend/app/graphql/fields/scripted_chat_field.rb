Fields::ScriptedChatField = GraphQL::Field.define do
  name "scripted chat"
  description "Show scripted chat"
  type Types::ScriptedChatType
  argument :id, !types.ID
  resolve ->(_obj, args, _ctx) {
    if args[:id].scan(/^\d+$/).any?
      ScriptedChat.find(args[:id])
    else
      ScriptedChat.find_by!(graphcms_ref: args[:id])
    end
  }
end
