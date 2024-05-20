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
FactoryBot.define do
  factory :idea_memo do
    idea_session
    perspective { :modify }
    hint { 'MyText' }
    answer { 'a' * 255 }
    comment { 'a' * 255 }
  end
end
