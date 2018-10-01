Connections::ExpositionsConnection = Types::ExpositionType.define_connection do
  name 'expositionsConnection'

  field :aggregate do
    type !Types::AggregateType

    resolve ->(obj, _args, _ctx) {
      obj
    }
  end
end
