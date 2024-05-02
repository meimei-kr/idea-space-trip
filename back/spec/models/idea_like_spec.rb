require 'rails_helper'

RSpec.describe IdeaLike do
  describe 'associations' do
    it { is_expected.to belong_to(:user) }
    it { is_expected.to belong_to(:idea_memo) }
  end

  describe 'validations' do
    it { is_expected.to validate_uniqueness_of(:user_id).scoped_to(:idea_memo_id) }
  end
end
