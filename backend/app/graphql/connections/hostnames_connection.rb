Connections::HostnamesConnection = Types::HostnameType.define_connection do
  name "hostnamesConnection"

  field :aggregate do
    type !Types::AggregateType

    resolve ->(obj, _args, _ctx) {
      obj
    }
  end
end
