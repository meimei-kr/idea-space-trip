class AiGeneratedThemeSerializer
  include JSONAPI::Serializer
  set_key_transform :camel_lower

  set_type :ai_generated_theme
  attributes :theme
end
