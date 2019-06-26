class SparkpostMailer < ApplicationMailer
  def delius_asmt_inquiry(record)
    sparkpost_data = {
      substitution_data: {
        inquiry_name: record.name, inquiry_phone: record.phone, inquiry_message: record.message,
        inquiry_url: record.url, inquiry_email: record.email, inquiry_tags: record.tags,
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
