class IdeaMemo < ApplicationRecord
  belongs_to :idea_session

  attribute :perspective, :integer
  enum :perspective,
       { modify: 10, substitute: 20, reverse: 30, combine: 40, magnify: 50, minify: 60 },
       prefix: true

  validates :perspective, presence: true
  validates :answer, presence: true, length: { maximum: 255 }
end
