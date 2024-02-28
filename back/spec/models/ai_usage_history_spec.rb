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
require 'rails_helper'

RSpec.describe AiUsageHistory do
  pending "add some examples to (or delete) #{__FILE__}"
end
