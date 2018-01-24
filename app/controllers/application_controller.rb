class ApplicationController < ActionController::API
  include Pundit

  private

  def pundit_user
    current_influencer
  end
end
