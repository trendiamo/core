class ProductUploadMailer < ActionMailer::Base
  default from: "frb@trendiamo.com"
  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.product_upload_mailer.send_csv.subject
  #
  def send_csv
    @greeting = "Hi"

    mail to: "frb@trendiamo.com"
  end
end
