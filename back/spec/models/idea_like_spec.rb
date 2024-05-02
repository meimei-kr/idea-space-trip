require 'rails_helper'

RSpec.describe IdeaLike do
  describe 'associations' do
    it { should belong_to(:user) }
    it { should belong_to(:idea_memo) }
  end

  describe 'validations' do
    it { should validate_uniqueness_of(:user_id).scoped_to(:idea_memo_id) }
  end
end
