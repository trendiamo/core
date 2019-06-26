class DeviseSparkpostMailer < Devise::Mailer
  default from: "Trendiamo Team <no-reply@trendiamo.com>"

  def confirmation_instructions(record, token, _opts = {})
    url = api_v1_users_confirmation_url(record, confirmation_token: token)
    sparkpost_data = {
      substitution_data: {
        user_identifier: record.first_name,
        # https://developers.sparkpost.com/api/template-language/#header-links
        dynamic_html: { confirm_email_link: %(<a href="#{url}">Confirm your email</a>) },
      },
      template_id: "confirmation-instructions",
    }
    mail(to: record.email, sparkpost_data: sparkpost_data)
  end

  def reset_password_instructions(record, token, _opts = {})
    url = api_v1_users_password_edit_url(record, reset_password_token: token)
    sparkpost_data = {
      substitution_data: {
        user_identifier: record.first_name,
        dynamic_html: { change_password_link: %(<a href="#{url}">Change my password</a>) },
      },
      template_id: "reset-password-instructions",
    }
    mail(to: record.email, sparkpost_data: sparkpost_data)
  end

  def delius_asmt_inquiry(record) # rubocop:disable Metrics/MethodLength
    sparkpost_data = {
      substitution_data: {
        inquiry_name: record.name,
        inquiry_phone: record.phone,
        inquiry_message: record.message,
        inquiry_url: record.url,
        inquiry_email: record.email,
      },
      template_id: "asmt-inquiry",
    }
    mail(to: ENV["DELIUS_ASMT_EMAIL"], sparkpost_data: sparkpost_data)
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
