# == Schema Information
#
# Table name: idea_sessions
#
#  id                     :bigint           not null, primary key
#  user_id                :bigint           not null
#  uuid                   :string           not null
#  is_theme_determined    :boolean          default(FALSE), not null
#  is_ai_theme_generated  :boolean          default(FALSE), not null
#  theme_category         :integer          default("unselected"), not null
#  theme_question         :integer          default("unselected"), not null
#  theme_answer           :text
#  is_ai_answer_generated :boolean          default(FALSE), not null
#  ai_answer_retry_count  :integer          default(0), not null
#  theme                  :text
#  is_finished            :boolean          default(FALSE), not null
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#
class IdeaSession < ApplicationRecord
  belongs_to :user
  has_many :ai_generated_themes, dependent: :destroy
  has_many :ai_generated_answers, dependent: :destroy
  has_many :idea_memos, dependent: :destroy

  validates :uuid, presence: true, uniqueness: true
  validates :is_theme_determined, inclusion: { in: [true, false] }
  validates :is_ai_theme_generated, inclusion: { in: [true, false] }
  validates :theme_category, presence: true
  validates :theme_question, presence: true
  validates :is_ai_answer_generated, inclusion: { in: [true, false] }
  validates :ai_answer_retry_count, presence: true,
                                    numericality: { only_integer: true,
                                                    greater_than_or_equal_to: 0 }
  validates :is_finished, inclusion: { in: [true, false] }
  validates :theme, length: { maximum: 255 }

  attribute :theme_category, :integer
  attribute :theme_question, :integer
  enum :theme_category, { unselected: 0, application: 10, product: 20, service: 30 }, prefix: true
  enum :theme_question, { unselected: 0, question1: 10, question2: 20, question3: 30 }, prefix: true
end
