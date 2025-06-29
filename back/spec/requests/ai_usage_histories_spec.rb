require 'rails_helper'

RSpec.describe 'AiUsageHistories' do
  let!(:user) { create(:user) }
  let!(:token) { encode_jwt({ user_id: user.id, exp: 24.hours.from_now.to_i }) }
  let!(:headers) { { Authorization: "Bearer #{token}" } }

  describe 'GET /api_v1_ai_usage_history' do
    context 'when authenticated' do
      context 'when the user has an AiUsageHistory' do
        before { create(:ai_usage_history, user:) }

        it 'returns AiUsageHistory' do
          get(api_v1_ai_usage_history_path, headers:)
          expect(response).to have_http_status(:ok)
          Rails.logger.debug response.body
          expect(json['data']['attributes']['userId']).to eq(user.id)
        end
      end

      context 'when the user failed to create AiUsageHistory when logged in' do
        it 'returns not found status' do
          get(api_v1_ai_usage_history_path, headers:)
          expect(response).to have_http_status(:not_found)
        end
      end
    end

    context 'when unauthenticated' do
      it 'returns unauthorized status' do
        get api_v1_ai_usage_history_path, headers: {}
        expect(response).to have_http_status(:unauthorized)
        expect(json['error']).to eq('認証に失敗しました')
      end
    end
  end

  describe 'PATCH /api_v1_ai_usage_history' do
    context 'when authenticated' do
      before { create(:ai_usage_history, user:) }

      it 'updates AiUsageHistory' do
        patch(api_v1_ai_usage_history_path, headers:)
        expect(response).to have_http_status(:ok)
        expect(json['data']['attributes']['count']).to eq(1)
      end
    end

    context 'when unauthenticated' do
      it 'returns unauthorized status' do
        patch api_v1_ai_usage_history_path, headers: {}
        expect(response).to have_http_status(:unauthorized)
        expect(json['error']).to eq('認証に失敗しました')
      end
    end
  end
end
