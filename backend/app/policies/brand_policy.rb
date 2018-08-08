class BrandPolicy < ApplicationPolicy
  def permitted_attributes
    %i[ domestic_shipping_time eu_shipping_time general_shipping_info header_content_photo header_content_video legal_name legal_address_street legal_address_number legal_address_city legal_address_country
        legal_address_postal_code logo_url long_description is_complete name outside_eu_shipping_time short_description trendiamo_shipping_info ]
  end

  def add_brand?
    user
  end

  def update_brand?
    user.id == record.user_id
  end
end
