class ConvertAndAssignShowcaseImages
  def initialize(params)
    @params = params
  end

  def perform
    convert_and_assign_images
  end

  private

  def convert_and_assign_images
    @params[:showcase][:spotlights_attributes]&.each do |spotlight_attributes|
      spotlight_attributes[:product_picks_attributes]&.each do |product_pick_attributes|
        img_url = (product_pick_attributes[:img] && product_pick_attributes[:img][:url])
        return if img_url.empty?

        image = Image.find_by(url: img_url)

        return unless image

        product_pick_attributes[:img_id] = image.id
        product_pick_attributes.delete(:img_url)
      end
    end
  end
end
