class CsvController < ApplicationController
  before_action :authenticate_user!
  def forward
    @user = User.find_by(email: request.headers["HTTP_X_USER_EMAIL"])
    @file = params[:file]
    email_trendiamo = ProductUploadMailer.send_csv(@user, @file)
    email_trendiamo.deliver_now
    email_user = UploadUserMailer.review_csv(@user)
    email_user.deliver_now
  end
end
