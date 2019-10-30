class ShopController < BaseAuthenticatedController
  after_action :include_tracker_script, only: :enable

  def show
    render json: current_shop.as_json
  end

  def enable
    if current_shop.update(accepted_terms_and_conditions_at: Time.now.utc)
      render json: current_shop
    else
      render_error
    end
  end

  private

  def include_tracker_script
    ShopifyAPI::ScriptTag.create(event: "onload", src: "https://js.frekkls.com/tracker.js", display_scope: "all")
  end

  def render_error
    errors = [{ "title": "Failed to enable the app." }]
    render json: { errors: errors }, status: :unprocessable_entity
  end
end
