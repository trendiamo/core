Tiddle::ModelName.module_eval do
  def with_underscores(model)
    model.model_name.to_s.underscore.split("/").last.upcase
  end
end
