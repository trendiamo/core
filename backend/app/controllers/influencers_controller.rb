class InfluencersController < ApplicationController
  def index
    @influencers = Influencer.all
    authorize @influencers
    render json: @influencers
  end

  def show
    @influencer = Influencer.find(params[:id])
    authorize @influencer
    render json: @influencer
  end

  def update
    @influencer = Influencer.find(params[:id])
    authorize @influencer
    if @influencer.update(influencer_params)
      render json: @influencer
    else
      render_error
    end
  end

  def create
    @influencer = Influencer.new(influencer_params)
    authorize @influencer
    if @influencer.save
      render json: @influencer, status: :created
    else
      render_error
    end
  end

  def destroy
    @influencers = Influencer.where(id: params[:ids])
    authorize @influencers
    if @influencers.destroy_all
      render json: { data: @influencers }
    else
      render_error
    end
  end

  private

  def influencer_params
    params.require(:influencer).permit(:name, :description, :profile_pic_url)
  end

  def render_error
    errors = @influencer.errors.full_messages.map { |string| { title: string } }
    render json: { errors: errors }, status: :unprocessable_entity
  end
end
