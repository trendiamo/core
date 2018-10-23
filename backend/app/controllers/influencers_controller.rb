class InfluencersController < ApplicationController
  def index
    @influencers = Influencer.all
    authorize @influencers
    response.headers["Content-Range"] = "influencers #{@influencers.count}/#{@influencers.count}"
    response.headers["Access-Control-Expose-Headers"] = "Content-Range"
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
    @influencer = Influencer.find(params[:id])
    authorize @influencer
    if @influencer.destroy
      render json: { data: @influencer }
    else
      render_error
    end
  end

  private

  def influencer_params
    params.require(:influencer).permit(:id, :name, :description, :profile_pic_url).merge(account: current_user.account)
  end

  def render_error
    render json: { errors: @influencer.errors }, status: :unprocessable_entity
  end
end
