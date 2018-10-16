class ProductUploadMailer < ActionMailer::Base
  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #   en.product_upload_mailer.send_csv.subject
  def send_csv(user, file)
    @user = user
    attachments[file.original_filename] = File.read(file.tempfile)
    mail(to: ENV["TRENDIAMO_EMAIL"], subject: "CSV upload")
  end
end
