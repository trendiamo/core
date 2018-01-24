class LikesController < ApplicationController
  # before_action :authenticate_consumer!

  def show
    @like = Like.find_by!(consumer_ref: params[:consumer_ref], product_ref: params[:product_ref])
    authorize @like
    render json: @like
  end

  def create
    @like = Like.new(permitted_attributes(Like))
    authorize @like
    if @like.save
      render json: @like, status: :created # , location: @like
    else
      render json: @like.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @like = Like.find(params[:id])
    authorize @like
    @like.destroy
  end
end
