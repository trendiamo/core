class SparkpostMailer < ApplicationMailer
  def delius_asmt_inquiry(hash)
    sparkpost_data = {
      substitution_data: substitution_data(hash),
      template_id: "asmt-inquiry",
    }
    mail(to: ENV["DELIUS_ASMT_EMAIL"], bcc: ENV["DELIUS_ASMT_EMAIL_BCC"], sparkpost_data: sparkpost_data)
  end

  private

  # url needs to be passed separately, see
  # https://developers.sparkpost.com/api/template-language/#header-links
  def substitution_data(hash)
    hash.except(:url).merge(dynamic_html: { url: %(<a href="#{hash[:url]}">#{hash[:url]}</a>) })
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
