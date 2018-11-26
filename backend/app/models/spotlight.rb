class Spotlight < ApplicationRecord
  acts_as_tenant
  belongs_to :persona
end
