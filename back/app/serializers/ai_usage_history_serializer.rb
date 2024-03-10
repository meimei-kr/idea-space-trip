class AiUsageHistorySerializer
  include JSONAPI::Serializer
  set_key_transform :camel_lower

  set_type :ai_usage_history
  attributes :date, :count, :user_id
end
