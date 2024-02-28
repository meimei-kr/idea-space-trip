class IdeaSessionSerializer
  include JSONAPI::Serializer
  set_key_transform :camel_lower

  set_type :idea_session
  attributes :uuid, :is_theme_determined, :is_ai_theme_generated,
             :category, :question, :is_ai_answer_generated,
             :theme, :is_finished
end
