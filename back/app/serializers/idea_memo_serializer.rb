# == Schema Information
#
# Table name: idea_memos
#
#  id              :bigint           not null, primary key
#  uuid            :string           not null
#  idea_session_id :bigint           not null
#  perspective     :integer          not null
#  hint            :text
#  answer          :text             not null
#  comment         :text
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class IdeaMemoSerializer
  include JSONAPI::Serializer
  set_key_transform :camel_lower

  set_type :idea_memo
  attributes :uuid, :perspective, :hint, :answer, :comment, :idea_session_id, :created_at
  attribute :is_liked do |object, params|
    params[:current_user].like?(object)
  end
  belongs_to :idea_session, serializer: IdeaSessionSerializer
end
