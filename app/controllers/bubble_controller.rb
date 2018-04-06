class BubbleController < ApplicationController
  before_action :check_bubble_auth

  private

  def check_bubble_auth
    return true if request.headers["Authorization"] == ENV["BUBBLE_API_SHARED_SECRET"]
    render json: { errors: { "auth": "Bad Authorization header" } }, status: :unauthorised
  end
end
