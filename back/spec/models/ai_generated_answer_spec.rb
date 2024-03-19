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
require 'rails_helper'

RSpec.describe AiGeneratedAnswer do
  pending "add some examples to (or delete) #{__FILE__}"
end
