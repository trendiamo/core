module Spree
  module Admin
    class TaxonContentsController < Spree::Admin::BaseController
      def edit
        @taxon = Spree::Taxon.find(params[:taxon_id])
        @taxon_content = @taxon.taxon_content
      end

      def update
        @taxonomy = Spree::Taxonomy.find(params[:taxonomy_id])
        @taxon = Spree::Taxon.find(params[:taxon_id])
        @taxon_content = @taxon.taxon_content

        @taxon_content.assign_attributes(taxon_content_params)

        if @taxon_content.save
          flash[:success] = flash_message_for(@taxon_content, :successfully_updated)
        end

        respond_with(@taxon_content) do |format|
          format.html { redirect_to edit_admin_taxonomy_taxon_url(@taxonomy, @taxon.id) }
        end
      end

      private

      def taxon_content_params
        permitted_taxon_attributes = %i[id about_title about_text legal_business_name business_location about_video_url
                                        about_image_url shipping_timeframe about_active about_video_active
                                        produce_on_demand]
        params.require(:taxon_content).permit(permitted_taxon_attributes)
      end
    end
  end
end
