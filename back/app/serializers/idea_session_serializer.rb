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
class IdeaSessionSerializer
  include JSONAPI::Serializer
  set_key_transform :camel_lower

  set_type :idea_session
  attributes :uuid, :is_theme_determined, :is_ai_theme_generated,
             :theme_category, :theme_question, :theme_answer, :is_ai_answer_generated,
             :ai_answer_retry_count, :theme, :is_finished, :user_id
  has_many :idea_memos, serializer: IdeaMemoSerializer
end
