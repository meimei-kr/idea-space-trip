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
class UserSerializer
  include JSONAPI::Serializer
  set_key_transform :camel_lower

  set_type :user
  attributes :name, :email, :provider
end
