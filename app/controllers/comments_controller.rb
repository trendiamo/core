class CommentsController < ApplicationController
  before_action :authenticate_user!

  def index
    authorize Comment
    @comments = Comment.where(product_ref: params[:product_ref])
    render json: @comments
  end

  def create
    @comment = Comment.new(permitted_attributes(Comment))
    authorize @comment
    if @comment.save
      render json: @comment, status: :created
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end
end
