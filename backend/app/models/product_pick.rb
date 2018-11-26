class ProductPick < ApplicationRecord
  acts_as_tenant
  belongs_to :spotlight
end
