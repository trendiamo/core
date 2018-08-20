class UploadUserMailer < ApplicationMailer
  default from: "no-reply@trendiamo.com"
  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.upload_user_mailer.review_csv.subject
  #
  def review_csv(user)
    @user = user

    mail(to: user.email, subject: "Products Review")
  end
end
