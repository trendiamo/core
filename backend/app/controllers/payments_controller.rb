class PaymentsController < RestController
  def create
    # @payment = policy_scope(Payment).build(permitted_attributes(Payment))
    # authorize @payment
    @payment = make_payment
    if @payment["error"]
      render json: @payment, status: :unprocessable_entity
    else
      render json: @payment, status: :created
    end
  end

  private

  def make_payment
    product = params[:product].permit!.to_h
    shipping = params[:shipping].permit!.to_h
    token = params[:token].permit!.to_h
    Stripe::MakePayment.new(product, shipping, token).perform
  end
end
