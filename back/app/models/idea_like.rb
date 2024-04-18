class IdeaLike < ApplicationRecord
  belongs_to :user
  belongs_to :idea_memo

  validates :user_id, uniqueness: { scope: :idea_memo_id }
end
