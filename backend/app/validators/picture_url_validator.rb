class PictureUrlValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    unless value.starts_with?('http')
      record.errors.add(:url, attribute, message: "Invalid URL")
    end
  end
end
