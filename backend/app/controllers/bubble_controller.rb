class BubbleController < ApplicationController
  before_action :check_bubble_auth
  before_action :fix_null_params

  private

  def check_bubble_auth
    return true if request.headers["Authorization"] == ENV["BUBBLE_API_SHARED_SECRET"]
    render json: { errors: { "auth": "Bad Authorization header" } }, status: :unauthorised
  end

  def fix_null_params
    fix_null_values(params)
  end

  # Bubble API Connector makes it so we receive empty params as a string: "null". Fix that here:
  def fix_null_values(hash)
    hash.each_pair do |k, v|
      if v.is_a?(Hash) || v.is_a?(ActionController::Parameters)
        fix_null_values(v)
      elsif hash[k] == "null"
        hash[k] = nil
      end
    end
  end
end
