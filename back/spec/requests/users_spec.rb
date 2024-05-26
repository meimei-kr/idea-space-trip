require 'rails_helper'

RSpec.describe 'Api::V1::Users' do
  let!(:user) { create(:user) }
  let!(:token) { encode_jwt({ user_id: user.id, exp: 24.hours.from_now.to_i }) }
  let!(:headers) { { Authorization: "Bearer #{token}" } }

  describe 'GET /api/v1/user' do
    context 'when authenticated' do
      it 'returns the user' do
        get(api_v1_user_path, headers:)
        expect(response).to have_http_status(:ok)
        expect(json['data']['attributes']['email']).to eq(user.email)
      end
    end

    context 'when unauthenticated' do
      it 'returns unauthorized status' do
        get api_v1_user_path
        expect(response).to have_http_status(:unauthorized)
        expect(json['error']).to eq('認証に失敗しました')
      end
    end
  end

  describe 'POST /auth/google/callback' do
    context 'when valid request' do
      it 'creates a new user and returns accessToken' do
        user_params = attributes_for(:user)
        post '/auth/google/callback', params: { user: user_params }
        expect(response).to have_http_status(:ok)
        expect(json['user']['email']).to eq(user_params[:email])
        expect(json['accessToken']).to be_present
      end
    end

    context 'when invalid request' do
      it 'returns internal_server_error status' do
        post '/auth/google/callback', params: { user: { email: '', name: '', provider: '' } }
        expect(response).to have_http_status(:internal_server_error)
        expect(json['error']).to include('ログインに失敗しました')
      end
    end
  end

  describe 'DELETE /api/v1/user' do
    context 'when authenticated' do
      it 'deletes the user' do
        delete(api_v1_user_path, headers:)
        expect(response).to have_http_status(:no_content)
        expect(User).not_to exist(user.id)
      end
    end
  end
end
