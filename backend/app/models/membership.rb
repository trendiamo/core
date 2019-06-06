class Membership < ApplicationRecord
  enum role: %i[owner editor]
end
