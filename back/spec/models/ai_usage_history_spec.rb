# == Schema Information
#
# Table name: ai_usage_histories
#
#  id         :bigint           not null, primary key
#  user_id    :bigint           not null
#  date       :date             not null
#  count      :integer          default(0), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
require 'rails_helper'

RSpec.describe AiUsageHistory do
  describe 'validation' do
    it 'is valid with valid attributes' do
      ai_usage_history = build(:ai_usage_history)
      expect(ai_usage_history).to be_valid
    end

    it 'is invalid without date' do
      ai_usage_history = build(:ai_usage_history, date: nil)
      expect(ai_usage_history).not_to be_valid
    end

    it 'is invalid without count' do
      ai_usage_history = build(:ai_usage_history, count: nil)
      expect(ai_usage_history).not_to be_valid
    end
  end
end
