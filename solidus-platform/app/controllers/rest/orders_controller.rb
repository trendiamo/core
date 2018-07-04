module Rest
  class OrdersController < ApplicationController
    skip_before_action :verify_authenticity_token

    def create
      order = CreateOrder.new(params[:token][:id]).perform
      render json: order
    end
  end
end
