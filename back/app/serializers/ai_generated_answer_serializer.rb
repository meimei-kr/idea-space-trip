# == Schema Information
#
# Table name: ai_generated_answers
#
#  id              :bigint           not null, primary key
#  perspective     :integer          not null
#  hint            :text             not null
#  answer          :text             not null
#  idea_session_id :bigint           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class AiGeneratedAnswerSerializer
  include JSONAPI::Serializer
  set_key_transform :camel_lower

  set_type :ai_generated_answer
  attributes :perspective, :hint, :answer, :idea_session_id
end
