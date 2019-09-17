class DeviseSparkpostMailer < Devise::Mailer
  default from: "Trendiamo Team <no-reply@trendiamo.com>"

  def confirmation_instructions(record, token, _opts = {})
    url = api_v1_users_confirmation_url(record, { confirmation_token: token }.merge(host_options(record)))
    sparkpost_data = {
      substitution_data: {
        app: record.not_affiliate? ? "frekkls" : "uptous",
        user_identifier: record.first_name,
        # https://developers.sparkpost.com/api/template-language/#header-links
        dynamic_html: { confirm_email_link: %(<a href="#{url}">Confirm your email</a>) },
      },
      template_id: "confirmation-instructions",
    }
    mail(to: record.email, sparkpost_data: sparkpost_data)
  end

  def reset_password_instructions(record, token, _opts = {})
    url = api_v1_users_password_edit_url(record, { reset_password_token: token }.merge(host_options(record)))
    sparkpost_data = {
      substitution_data: {
        app: record.not_affiliate? ? "frekkls" : "uptous",
        user_identifier: record.first_name,
        dynamic_html: { change_password_link: %(<a href="#{url}">Change my password</a>) },
      },
      template_id: "reset-password-instructions",
    }
    mail(to: record.email, sparkpost_data: sparkpost_data)
  end

  def invite(record, token, _opts = {}) # rubocop:disable Metrics/MethodLength
    url = api_v1_users_invites_url({ token: token }.merge(host_options(record)))
    sparkpost_data = {
      substitution_data: {
        sender_first_name: record.sender.first_name,
        account_name: record.account.name,
        invite_url: "#{ENV['MAILER_HOST']}/api/v1/users/invites/accept?token=#{token}",
        dynamic_html: { accept_email_link: %(<a href="#{url}">Accept the invite</a>) },
      },
      template_id: "accept-invite",
    }
    mail(to: record.email, sparkpost_data: sparkpost_data)
  end

  private

  def host_options(record)
    return { host: "localhost", port: 5000 } if ENV["MAILER_HOST"].blank? || ENV["UPTOUS_MAILER_HOST"].blank?

    { host: record.not_affiliate? ? ENV["MAILER_HOST"] : ENV["UPTOUS_MAILER_HOST"] }
  end

  def mail(*args)
    if ENV["SPARKPOST_API_KEY"]
      # https://github.com/the-refinery/sparkpost_rails#using-sparkpost-templates
      super(*args) { |f| f.text { render plain: "" } }
    else
      Rails.logger.info("Deliver email: #{args.join}")
    end
  end
end
