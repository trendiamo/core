class SparkpostMailer < ApplicationMailer
  def delius_asmt_inquiry(record)
    sparkpost_data = {
      substitution_data: {
        inquiry_name: record.name, inquiry_phone: record.phone, inquiry_message: record.message,
        inquiry_url: record.url, inquiry_email: record.email, inquiry_asmt: record.asmt,
        inquiry_asmt_step1_choice: record.asmt_step1_choice, inquiry_asmt_step2_choice: record.asmt_step2_choice,
        inquiry_asmt_step3_choices: record.asmt_step3_choices,
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
