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
