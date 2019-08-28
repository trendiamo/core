class ConvertPicUrlsToPics
  def self.process
    new.process
  end

  def process
    convert_pictures
  end

  private

  def convert_pictures
    Account.all.each do |account|
      ActsAsTenant.default_tenant = account
      convert_and_assign_pics(NavigationItem.all)
      convert_and_assign_pics(ProductPick.all)
      convert_and_assign_profile_pics(Persona.all)
    end
  end

  def convert_and_assign_pics(elements)
    elements.each do |element|
      next if element.pic_url.blank?

      picture = Picture.find_or_create_by!(url: element.pic_url)
      element.pic_id = picture.id
      element.save!
    end
  end

  def convert_and_assign_profile_pics(elements)
    elements.each do |element|
      %i[profile_pic profile_pic_animation].each do |pic|
        next if element["#{pic}_url"].blank?

        picture = Picture.find_or_create_by!(url: element["#{pic}_url"])
        element["#{pic}_id"] = picture.id
        element.save!
      end
    end
  end
end

ConvertPicUrlsToPics.process
