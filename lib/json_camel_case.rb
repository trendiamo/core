# adapted from https://github.com/vigetlabs/olive_branch
# converts params and response objects from/to camel case
# rubocop:disable all
class JsonCamelCase
  def initialize(app)
    @app = app
  end

  def call(env)
    if env['CONTENT_TYPE'] =~ /application\/json/
      underscore_params(env)
    end

    @app.call(env).tap do |_status, headers, response|
      next unless headers['Content-Type'] =~ /application\/json/
      response.each do |body|
        begin
          new_response = JSON.parse(body)
        rescue JSON::ParserError
          next
        end

        if new_response.is_a?(Array)
          new_response.each { |o| o.deep_transform_keys! { |k| k.camelize(:lower) } }
        else
          new_response.deep_transform_keys! { |k| k.camelize(:lower) }
        end

        body.replace(new_response.to_json)
      end
    end
  end

  def underscore_params(env)
    if defined?(Rails) && Rails::VERSION::MAJOR >= 5
      begin
        request_body = JSON.parse(env['rack.input'].read)
        request_body.deep_transform_keys!(&:underscore)
        req = StringIO.new(request_body.to_json)

        env['rack.input'] = req
        env['CONTENT_LENGTH'] = req.length
      rescue JSON::ParserError
      end
    else
      env['action_dispatch.request.request_parameters'].deep_transform_keys!(&:underscore)
    end
  end
end
