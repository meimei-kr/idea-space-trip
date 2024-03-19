# == Schema Information
#
# Table name: ai_generated_themes
#
#  id              :bigint           not null, primary key
#  theme           :text             not null
#  idea_session_id :bigint           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class AiGeneratedThemeSerializer
  include JSONAPI::Serializer
  set_key_transform :camel_lower

  set_type :ai_generated_theme
  attributes :theme
end
