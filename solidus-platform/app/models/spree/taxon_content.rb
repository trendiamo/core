module Spree
  class TaxonContent < Spree::Base
    belongs_to :taxon, class_name: "Spree::Taxon"
  end
end
