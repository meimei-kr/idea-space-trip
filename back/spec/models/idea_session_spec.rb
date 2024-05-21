# == Schema Information
#
# Table name: idea_sessions
#
#  id                     :bigint           not null, primary key
#  user_id                :bigint           not null
#  uuid                   :string           not null
#  is_theme_determined    :boolean          default(FALSE), not null
#  is_ai_theme_generated  :boolean          default(FALSE), not null
#  theme_category         :integer          default("unselected"), not null
#  theme_question         :integer          default("unselected"), not null
#  theme_answer           :text
#  is_ai_answer_generated :boolean          default(FALSE), not null
#  ai_answer_retry_count  :integer          default(0), not null
#  theme                  :text
#  is_finished            :boolean          default(FALSE), not null
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#
require 'rails_helper'

RSpec.describe IdeaSession do
  # バリデーションのテスト
  describe 'validation' do
    it 'is valid with valid attributes' do
      idea_session = build(:idea_session)
      expect(idea_session).to be_valid
    end

    it 'is invalid without uuid' do
      idea_session = build(:idea_session, uuid: nil)
      expect(idea_session).not_to be_valid
    end

    it 'is invalid with a duplicate uuid' do
      idea_session = create(:idea_session)
      other_idea_session = build(:idea_session, uuid: idea_session.uuid)
      expect(other_idea_session).not_to be_valid
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

    it 'is invalid without ai_answer_retry_count' do
      idea_session = build(:idea_session, ai_answer_retry_count: nil)
      expect(idea_session).not_to be_valid
    end

    it 'is invalid when ai_answer_retry_count is not an integer' do
      idea_session = build(:idea_session, ai_answer_retry_count: 1.5)
      expect(idea_session).not_to be_valid
    end

    it 'is invalid when ai_answer_retry_count is less than 0' do
      idea_session = build(:idea_session, ai_answer_retry_count: -1)
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

  # アソシエーションのテスト
  describe 'association' do
    it { is_expected.to belong_to(:user) }
    it { is_expected.to have_many(:ai_generated_themes).dependent(:destroy) }
    it { is_expected.to have_many(:ai_generated_answers).dependent(:destroy) }
    it { is_expected.to have_many(:idea_memos).dependent(:destroy) }
  end

  # enumのテスト
  describe 'enums' do
    it do
      # rubocop:disable RSpec/ImplicitSubject
      is_expected.to define_enum_for(:theme_category)
        .with_values(unselected: 0, application: 10, product: 20, service: 30)
        .with_prefix(:theme_category)
      # rubocop:enable RSpec/ImplicitSubject
    end

    it do
      # rubocop:disable RSpec/ImplicitSubject
      is_expected.to define_enum_for(:theme_question)
        .with_values(unselected: 0, question1: 10, question2: 20, question3: 30)
        .with_prefix(:theme_question)
      # rubocop:enable RSpec/ImplicitSubject
    end
  end
end
