class WebsitesController < ApplicationController
  before_action :authenticate_user!

  def show
    @website = Website.find(params[:id])
    authorize @website
    fresh_when(etag: @website)
    render json: @website if stale?(@website)
  end

  def update
    @website = Website.find(params[:id])
    authorize @website
    if @website.update(website_params)
      render json: @website
    else
      errors = @website.errors.full_messages.map { |string| { title: string } }
      render json: { errors: errors }, status: :unprocessable_entity
    end
  end

  private

  def website_params
    params.require(:website).permit(:name, hostnames: [])
  end
end
