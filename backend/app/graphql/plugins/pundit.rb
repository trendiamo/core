class Plugins::Pundit
  def self.use(object_proxy, **kwargs)
    %i[obj args ctx].each do |method|
      object_proxy.class.send(:define_method, method) { kwargs[method] }
    end
    object_proxy.extend(PunditObjectProxyMethods)
  end

  module PunditObjectProxyMethods
    def current_user
      ctx[:current_user]
    end

    def authorize(object)
      policy = policy(object)
      raise Pundit::NotAuthorizedError, query: query, policy: policy unless policy.send(:"#{query}?")
    end

    def permitted_attributes(object)
      policy = policy(object)
      filter_keys = policy.permitted_attributes.map(&:to_s)
      params(object).slice(*filter_keys)
    end

    def policy_scope(object)
      scope(object)
    end

    private

    def query
      target.name.underscore
    end

    def params(object)
      key = key(object)
      (args.key?(key) ? args[key].to_h : args.to_h).transform_keys { |k| k.to_s.underscore }
    end

    def key(object)
      if object.is_a?(Class)
        object.name.underscore
      else
        object.class.name.underscore
      end
    end

    def policy(object)
      Pundit.policy!(current_user, object)
    end

    def scope(object)
      Pundit.policy_scope!(current_user, object)
    end
  end
end
