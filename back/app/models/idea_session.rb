# == Schema Information
#
# Table name: idea_sessions
#
#  id                     :bigint           not null, primary key
#  user_id                :bigint           not null
#  uuid                   :string(255)      not null
#  is_theme_determined    :boolean          default(FALSE), not null
#  is_ai_theme_generated  :boolean          default(FALSE), not null
#  theme_category         :integer          default("unselected"), not null
#  theme_question         :integer          default(0), not null
#  theme_answer           :text(65535)
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
  validates :theme_category, presence: true
  validates :theme_question, presence: true
  validates :is_ai_answer_generated, inclusion: { in: [true, false] }
  validates :is_finished, inclusion: { in: [true, false] }
  validates :theme, length: { maximum: 255 }

  enum theme_category: { unselected: 0, application: 10, product: 20, service: 30 }
end
