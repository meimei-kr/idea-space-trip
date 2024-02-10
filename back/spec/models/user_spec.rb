require 'rails_helper'

RSpec.describe User, type: :model do
  # バリデーションのテスト
  describe 'validation' do
    context "正常性確認" do
      # 名前とメールアドレスがあれば、有効であること
      it 'is valid with a name and email' do
        user = build(:user)
        expect(user).to be_valid
      end
    end

    context "異常性確認" do
      # 名前がなければ、無効であること
      it "is invalid without a name" do
        user = build(:user, name: nil)
        expect(user).to be_invalid
      end

      # メールアドレスがなければ、無効であること
      it "is invalid without a email" do
        user = build(:user, email: nil)
        expect(user).to be_invalid
      end

      # 重複したメールアドレスなら無効であること
      it "is invalid with a duplicate email address" do
        create(:user, email: 'test@gmail.com')
        user = build(:user, email: 'test@gmail.com')
        expect(user).to be_invalid
      end
    end
  end
end
