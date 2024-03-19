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
FactoryBot.define do
  factory :user do
    name { 'test_user' }
    email { 'test@gmail.com' }
    provider { 'google' }

    trait :guest do
      email { 'guest@example.com' }
      provider { nil }
    end
  end
end
