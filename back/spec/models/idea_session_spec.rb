# == Schema Information
#
# Table name: idea_sessions
#
#  id                     :bigint           not null, primary key
#  user_id                :bigint           not null
#  uuid                   :string(255)      not null
#  is_theme_determined    :boolean          default(FALSE), not null
#  is_ai_theme_generated  :boolean          default(FALSE), not null
#  theme_category               :integer          default(0), not null
#  theme_question               :integer          default(0), not null
#  is_ai_answer_generated :boolean          default(FALSE), not null
#  theme                  :text(65535)
#  is_finished            :boolean          default(FALSE), not null
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#
require 'rails_helper'

RSpec.describe IdeaSession do
  describe 'validation' do
    it 'is valid with valid attributes' do
      idea_session = build(:idea_session)
      expect(idea_session).to be_valid
    end

    it 'is invalid without uuid' do
      idea_session = build(:idea_session, uuid: nil)
      expect(idea_session).not_to be_valid
    end

    it 'is invalid when is_theme_determined is neither true nor false' do
      idea_session = build(:idea_session, is_theme_determined: nil)
      expect(idea_session).not_to be_valid
    end

    it 'is invalid when is_ai_theme_generated is neither true nor false' do
      idea_session = build(:idea_session, is_ai_theme_generated: nil)
      expect(idea_session).not_to be_valid
    end

    it 'is invalid without theme_category' do
      idea_session = build(:idea_session, theme_category: nil)
      expect(idea_session).not_to be_valid
    end

    it 'is invalid without theme_question' do
      idea_session = build(:idea_session, theme_question: nil)
      expect(idea_session).not_to be_valid
    end

    it 'is invalid when is_ai_answer_generated is neither true nor false' do
      idea_session = build(:idea_session, is_ai_answer_generated: nil)
      expect(idea_session).not_to be_valid
    end

    it 'is invalid when is_finished is neither true nor false' do
      idea_session = build(:idea_session, is_finished: nil)
      expect(idea_session).not_to be_valid
    end

    it 'is invalid with theme that has more than 255 characters' do
      idea_session = build(:idea_session, theme: 'a' * 256)
      expect(idea_session).not_to be_valid
    end
  end
end
