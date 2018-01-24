class PdpsController < ApplicationController
  before_action :authenticate_influencer!

  def index
    @pdps = policy_scope(Pdp)
    authorize @pdps
    render json: @pdps
  end

  def show
    @pdp = Pdp.find(params[:id])
    authorize @pdp
    render json: @pdp
  end

  def create
    @pdp = Pdp.new(permitted_attributes(Pdp))
    authorize @pdp
    if @pdp.save
      render json: @pdp, status: :created, location: @pdp
    else
      render json: @pdp.errors, status: :unprocessable_entity
    end
  end

  def update
    @pdp = Pdp.find(params[:id])
    authorize @pdp
    if @pdp.update(permitted_attributes(@pdp))
      render json: @pdp
    else
      render json: @pdp.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @pdp = Pdp.find(params[:id])
    authorize @pdp
    @pdp.destroy
  end

  # private
  #
  # def pdp_params
  #   params.require(:pdp).permit(:title, :description, :start_at, :end_at)
  # end
end
