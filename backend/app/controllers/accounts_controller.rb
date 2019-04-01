class AccountsController < RestController
  def index
    @accounts = Account.order("name ASC")
    authorize @accounts
    render json: @accounts
  end

  def create
    @account = Account.new(account_params)
    authorize @account
    if @account.save
      render json: @account, status: :created
    else
      render_error
    end
  end

  private

  def account_params
    params.require(:account).permit(:name, websites_attributes: [:name, hostnames: []])
  end
end
