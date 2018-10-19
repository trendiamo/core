class DeviseSparkpostMailer < Devise::Mailer
  default from: "Trendiamo Team <no-reply@trendiamo.com>"

  def reset_password_instructions(record, token, _opts = {})
    url = users_password_edit_url(record, reset_password_token: token)
    sparkpost_data = {
      substitution_data: {
        user_identifier: record.email,
        # https://developers.sparkpost.com/api/template-language/#header-links
        dynamic_html: { change_password_link: %(<a href="#{url}">Change my password</a>) },
      },
      template_id: "reset-password-instructions",
    }
    mail(to: record.email, sparkpost_data: sparkpost_data)
  end

  private

  def mail(*args)
    if ENV["SPARKPOST_API_KEY"]
      # https://github.com/the-refinery/sparkpost_rails#using-sparkpost-templates
      super(*args) { |f| f.text { render plain: "" } }
    else
      Rails.logger.info("Deliver email: #{args.join}")
    end
  end
end
