# == Schema Information
#
# Table name: idea_memos
#
#  id              :bigint           not null, primary key
#  idea_session_id :bigint           not null
#  perspective     :integer          not null
#  hint            :text(65535)
#  answer          :text(65535)      not null
#  comment         :text(65535)
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class IdeaMemoSerializer
  include JSONAPI::Serializer
  set_key_transform :camel_lower

  set_type :idea_memo
  attributes :uuid, :perspective, :hint, :answer, :comment, :idea_session_id, :created_at
  belongs_to :idea_session, serializer: IdeaSessionSerializer
end
