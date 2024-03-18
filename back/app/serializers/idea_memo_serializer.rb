class IdeaMemoSerializer
  include JSONAPI::Serializer
  set_key_transform :camel_lower

  set_type :idea_memo
  attributes :perspective, :hint, :answer, :comment, :idea_session_id
  belongs_to :idea_session, serializer: IdeaSessionSerializer
end
