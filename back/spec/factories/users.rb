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
