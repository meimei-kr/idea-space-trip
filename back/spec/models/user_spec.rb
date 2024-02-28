# == Schema Information
#
# Table name: users
#
#  id         :bigint           not null, primary key
#  name       :string(255)      not null
#  email      :string(255)      not null
#  provider   :string(255)
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
end
