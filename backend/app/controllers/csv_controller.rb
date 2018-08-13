class CsvController < ApplicationController
  def forward
    @user = User.find_by(email: request.headers["HTTP_X_USER_EMAIL"])
    @file = params[:file]
    email = ProductUploadMailer.send_csv(@user, @file)
  end
end
