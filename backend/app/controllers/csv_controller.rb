class CsvController < ApplicationController
  before_action :authenticate_user!

  def forward
    @user = User.find_by(email: request.headers["HTTP_X_USER_EMAIL"])
    @file = params[:file]
    ProductUploadMailer.send_csv(@user, @file).deliver_now
    UploadUserMailer.review_csv(@user).deliver_now
  end
end
