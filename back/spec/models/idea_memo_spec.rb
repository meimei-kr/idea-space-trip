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
require 'rails_helper'

RSpec.describe IdeaMemo do
  pending "add some examples to (or delete) #{__FILE__}"
end
