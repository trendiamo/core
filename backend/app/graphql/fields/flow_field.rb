def flow_class_by_type(type)
  case type
  when "scripted-chat"
    ScriptedChat
  when "outro"
    Outro
  when "curation"
    Curation
  end
end

def flow_by_path(path)
  type, id = path[1..-1].split("/")
  klass = flow_class_by_type(type)
  return nil if !klass || !id
  if id.scan(/^\d+$/).any?
    klass.find(id)
  else
    klass.find_by!(graphcms_ref: id)
  end
end

Fields::FlowField = GraphQL::Field.define do
  name "flow"
  description "Show flow"
  type Types::FlowType
  argument :pathname, !types.String
  argument :pluginPath, types.String
  resolve ->(_obj, args, _ctx) {
    if args[:pluginPath]
      flow_by_path(args[:pluginPath])
    else
      Trigger.find_matching(args[:pathname])&.flow
    end
  }
end
