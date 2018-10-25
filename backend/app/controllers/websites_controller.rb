class WebsitesController < ApplicationController
  def show
    @website = Website.find(params[:id])
    authorize @website
    render json: @website
  end

  def update
    @website = Website.find(params[:id])
    authorize @website
    if @website.update_attributes(website_params)
      render json: @website
    else
      render json: { errors: @website.errors }, status: :unprocessable_entity
    end
  end

  private

  def website_params
    params.require(:website).permit(:id, :name, :title, :subtitle, hostnames: [])
  end
end
