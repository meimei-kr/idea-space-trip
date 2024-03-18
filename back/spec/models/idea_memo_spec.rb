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
require 'rails_helper'

RSpec.describe IdeaMemo do
  pending "add some examples to (or delete) #{__FILE__}"
end
