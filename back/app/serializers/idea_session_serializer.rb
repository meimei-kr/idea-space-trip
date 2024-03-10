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
class IdeaSessionSerializer
  include JSONAPI::Serializer
  set_key_transform :camel_lower

  set_type :idea_session
  attributes :uuid, :is_theme_determined, :is_ai_theme_generated,
             :theme_category, :theme_question, :is_ai_answer_generated,
             :theme, :is_finished, :user_id
end
