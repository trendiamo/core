class AccountsController < RestController
  def index
    @accounts = Account.all
    authorize @accounts
    chain = sorting(@accounts)
    render json: chain
  end
end
