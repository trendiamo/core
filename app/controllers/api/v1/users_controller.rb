class Api::V1::UsersController < ApplicationController
  before_action :authenticate_user!

  def update
    @user = current_user
    @user.attributes = permitted_attributes(@user)
    authorize @user
    if @user.save
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end
end
