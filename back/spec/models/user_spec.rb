# == Schema Information
#
# Table name: users
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  email      :string           not null
#  provider   :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
require 'rails_helper'

RSpec.describe User do
  # バリデーションのテスト
  describe 'validation' do
    context 'when normal' do
      # 名前とメールアドレスがあれば、有効であること
      it 'is valid with a name and email' do
        user = build(:user)
        expect(user).to be_valid
      end
    end

    context 'when abnormal' do
      # 名前がなければ、無効であること
      it 'is invalid without a name' do
        user = build(:user, name: nil)
        expect(user).not_to be_valid
      end

      # メールアドレスがなければ、無効であること
      it 'is invalid without a email' do
        user = build(:user, email: nil)
        expect(user).not_to be_valid
      end

      # 重複したメールアドレスなら無効であること
      it 'is invalid with a duplicate email address' do
        create(:user, email: 'test@gmail.com')
        user = build(:user, email: 'test@gmail.com')
        expect(user).not_to be_valid
      end
    end
  end

  # アソシエーションのテスト
  describe 'association' do
    it { is_expected.to have_many(:idea_sessions).dependent(:destroy) }
    it { is_expected.to have_many(:idea_memos).through(:idea_sessions) }
    it { is_expected.to have_one(:ai_usage_history).dependent(:destroy) }
    it { is_expected.to have_many(:idea_likes).dependent(:destroy) }
    it { is_expected.to have_many(:liked_idea_memos).through(:idea_likes).source(:idea_memo) }
  end

  # クラスメソッドのテスト
  describe '.find_with_jwt' do
    let!(:user) { create(:user) }
    let!(:secret_key) { Rails.application.credentials.secret_key_base }
    let!(:token) do
      JWT.encode({ user_id: user.id, exp: 24.hours.from_now.to_i }, secret_key, 'HS256')
    end

    context 'when the token is valid' do
      it 'finds a user' do
        expect(described_class.find_with_jwt(token)).to eq user
      end
    end

    context 'when the token is invalid' do
      let!(:invalid_token) { 'invalid_token' }

      it 'does not find a user' do
        expect(described_class.find_with_jwt(invalid_token)).to be_nil
      end
    end

    context 'when the token is expired' do
      let!(:expired_token) do
        JWT.encode({ user_id: user.id, exp: 1.second.ago.to_i }, secret_key, 'HS256')
      end

      it 'does not find a user' do
        expect(described_class.find_with_jwt(expired_token)).to be_nil
      end
    end
  end

  # インスタンスメソッドのテスト
  # アイデアメモお気に入り登録メソッド
  describe '#like' do
    context 'when the user likes the idea memo' do
      let!(:user) { create(:user) }
      let!(:idea_session) { create(:idea_session, user:) }
      let!(:idea_memo) { create(:idea_memo, idea_session:) }

      it 'increases the number of liked idea memos by 1' do
        expect do
          user.like(idea_memo)
        end.to change(user.liked_idea_memos, :count).by(1)
      end
    end
  end

  # アイデアメモお気に入り解除メソッド
  describe '#unlike' do
    context 'when the user unlikes the idea memo' do
      let!(:user) { create(:user) }
      let!(:idea_session) { create(:idea_session, user:) }
      let!(:idea_memo) { create(:idea_memo, idea_session:) }

      before do
        user.like(idea_memo)
      end

      it 'decreases the number of liked idea memos by 1' do
        expect do
          user.unlike(idea_memo)
        end.to change(user.liked_idea_memos, :count).by(-1)
      end
    end
  end

  # アイデアメモがお気に入り登録されているかどうか返すメソッド
  describe '#like?' do
    let!(:user) { create(:user) }
    let!(:idea_session) { create(:idea_session, user:) }
    let!(:idea_memo) { create(:idea_memo, idea_session:) }

    context 'when the user liked the idea memo' do
      before do
        user.like(idea_memo)
      end

      it 'returns true' do
        expect(user.like?(idea_memo)).to be true
      end
    end

    context 'when the user does not like the idea memo' do
      it 'returns false' do
        expect(user.like?(idea_memo)).to be false
      end
    end
  end
end
