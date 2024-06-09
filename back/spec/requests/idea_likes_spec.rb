require 'rails_helper'

RSpec.describe 'IdeaLikes API' do
  let!(:user) { create(:user) }
  let!(:token) { encode_jwt({ user_id: user.id, exp: 24.hours.from_now.to_i }) }
  let!(:headers) { { Authorization: "Bearer #{token}" } }
  let!(:idea_session) { create(:idea_session, user:) }

  describe 'POST /api/v1/idea_memos/:idea_memo_uuid/idea_likes' do
    context 'when authenticated' do
      let!(:idea_memo) { create(:idea_memo, idea_session:) }

      it 'likes the idea memo' do
        post("/api/v1/idea_memos/#{idea_memo.uuid}/idea_likes", headers:)
        expect(response).to have_http_status(:ok)
        expect(user).to be_like(idea_memo)
      end
    end

    context 'when unauthenticated' do
      let!(:idea_memo) { create(:idea_memo, idea_session:) }

      it 'returns unauthorized status' do
        post "/api/v1/idea_memos/#{idea_memo.uuid}/idea_likes", headers: {}
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe 'DELETE /api/v1/idea_memos/:idea_memo_uuid/idea_likes' do
    context 'when authenticated' do
      let!(:idea_memo) { create(:idea_memo, idea_session:) }

      it 'unlike the idea memo' do
        delete("/api/v1/idea_memos/#{idea_memo.uuid}/idea_likes", headers:)
        expect(response).to have_http_status(:ok)
        expect(user).not_to be_like(idea_memo)
      end
    end

    context 'when unauthenticated' do
      let!(:idea_memo) { create(:idea_memo, idea_session:) }

      it 'returns unauthorized status' do
        delete "/api/v1/idea_memos/#{idea_memo.uuid}/idea_likes", headers: {}
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
