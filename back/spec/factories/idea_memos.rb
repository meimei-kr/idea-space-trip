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
FactoryBot.define do
  factory :idea_memo do
    idea_session
    perspective { 1 }
    hint { 'MyText' }
    answer { 'MyText' }
    comment { 'MyText' }
  end
end
