class AiGeneratedAnswerSerializer
  include JSONAPI::Serializer
  set_key_transform :camel_lower

  set_type :ai_generated_answer
  attributes :perspective, :hint, :answer, :idea_session_id
end
