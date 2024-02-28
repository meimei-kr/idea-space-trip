# == Schema Information
#
# Table name: idea_sessions
#
#  id                     :bigint           not null, primary key
#  user_id                :bigint           not null
#  uuid                   :string(255)      not null
#  is_theme_determined    :boolean          default(FALSE), not null
#  is_ai_theme_generated  :boolean          default(FALSE), not null
#  category               :integer          default(0), not null
#  question               :integer          default(0), not null
#  is_ai_answer_generated :boolean          default(FALSE), not null
#  theme                  :text(65535)
#  is_finished            :boolean          default(FALSE), not null
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#
class IdeaSession < ApplicationRecord
  belongs_to :user

  validates :uuid, presence: true, uniqueness: true
  validates :is_theme_determined, inclusion: { in: [true, false] }
  validates :is_ai_theme_generated, inclusion: { in: [true, false] }
  validates :category, presence: true
  validates :question, presence: true
  validates :is_ai_answer_generated, inclusion: { in: [true, false] }
  validates :is_finished, inclusion: { in: [true, false] }
  validates :theme, length: { maximum: 255 }
end
