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
  # アソシエーションのテスト
  describe 'association' do
    it { is_expected.to belong_to(:idea_session) }
    it { is_expected.to have_one(:idea_like).dependent(:destroy) }
  end

  # バリデーションのテスト
  describe 'validation' do
    it 'is valid with valid attributes' do
      idea_memo = build(:idea_memo)
      expect(idea_memo).to be_valid
    end

    it 'is invalid without perspective' do
      idea_memo = build(:idea_memo, perspective: nil)
      expect(idea_memo).not_to be_valid
    end

    it 'is invalid without answer' do
      idea_memo = build(:idea_memo, answer: nil)
      expect(idea_memo).not_to be_valid
    end

    it 'is invalid with answer longer than 255 letters' do
      idea_memo = build(:idea_memo, answer: 'a' * 256)
      expect(idea_memo).not_to be_valid
    end

    it 'is invalid with comment longer than 255 letters' do
      idea_memo = build(:idea_memo, comment: 'a' * 256)
      expect(idea_memo).not_to be_valid
    end
  end

  # enumのテスト
  describe 'perspective enum' do
    it do
      # rubocop:disable RSpec/ImplicitSubject
      is_expected.to define_enum_for(:perspective)
        .with_values(modify: 10, substitute: 20, reverse: 30, combine: 40, magnify: 50, minify: 60)
        .with_prefix(true)
      # rubocop:enable RSpec/ImplicitSubject
    end
  end
end
