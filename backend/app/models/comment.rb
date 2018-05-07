class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :product
  has_many :upvotes, dependent: :destroy
  has_many :inappropriate_flags, dependent: :destroy

  validates :content, presence: true
  validates :pinned, inclusion: { in: [true, false] }
  validates :upvotes_count, presence: true
  validates :inappropriate_flags_count, presence: true
end
