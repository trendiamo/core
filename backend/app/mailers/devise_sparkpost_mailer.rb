class DeviseSparkpostMailer < Devise::Mailer
  default from: "Trendiamo Team <no-reply@trendiamo.com>"

  def reset_password_instructions(record, token, opts={})
    if ENV["SPARKPOST_API_KEY"]
      # https://developers.sparkpost.com/api/template-language/#header-links
      sparkpost_data = {
        substitution_data: {
          user_identifier: record.email,
          dynamic_html: {
            change_password_link: %(<a href="#{users_password_edit_url(record, reset_password_token: token)}">Change my password</a>)
          },
        },
        template_id: "reset-password-instructions",
      }
      sp_mail(to: record.email, sparkpost_data: sparkpost_data)
    else
      super
    end
  end

  private

  # https://github.com/the-refinery/sparkpost_rails#using-sparkpost-templates
  def sp_mail(*args)
    mail(*args) { |f| f.text { render plain: "" } }
  end
end
