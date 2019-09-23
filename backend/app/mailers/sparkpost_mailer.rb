class SparkpostMailer < ApplicationMailer
  def delius_asmt_inquiry(hash)
    sparkpost_data = {
      substitution_data: substitution_data(hash),
      template_id: "frekkls-asmt-inquiry",
    }
    mail(to: ENV["DELIUS_ASMT_EMAIL"], bcc: ENV["DELIUS_ASMT_EMAIL_BCC"], sparkpost_data: sparkpost_data)
  end

  def request_promoter_upgrade(user)
    sparkpost_data = {
      substitution_data: {
        promoter_name: "#{user.first_name} #{user.last_name}",
        promoter_email: user.email,
      },
      template_id: "uptous-promoter-upgrade-request",
    }
    mail(to: ENV["PROMOTER_UPGRADE_EMAIL"], sparkpost_data: sparkpost_data)
  end

  private

  # url needs to be passed separately, see
  # https://developers.sparkpost.com/api/template-language/#header-links
  def substitution_data(hash)
    new_attrs = { inquiry_email: hash[:email], dynamic_html: { url: %(<a href="#{hash[:url]}">#{hash[:url]}</a>) } }
    hash.except(:email, :url).merge(new_attrs)
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
