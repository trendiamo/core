class Spree::TaxonContent < Spree::Base
  belongs_to :taxon, class_name: "Spree::Taxon"
end
