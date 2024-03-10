# == Schema Information
#
# Table name: ai_usage_histories
#
#  id                     :bigint           not null, primary key
#  user_id                :bigint           not null
#  date                   :date             not null
#  theme_generated_count  :integer          default(0), not null
#  answer_generated_count :integer          default(0), not null
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#
class AiUsageHistorySerializer
  include JSONAPI::Serializer
  set_key_transform :camel_lower

  set_type :ai_usage_history
  attributes :date, :count, :user_id
end
