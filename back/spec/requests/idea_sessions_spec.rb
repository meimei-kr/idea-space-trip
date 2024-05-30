require 'rails_helper'

RSpec.describe 'IdeaSessions API' do
  let!(:user) { create(:user) }
  let!(:token) { encode_jwt({ user_id: user.id, exp: 24.hours.from_now.to_i }) }
  let!(:headers) { { Authorization: "Bearer #{token}" } }

  describe 'GET /api/v1/idea_sessions/show_in_progress' do
    context 'when authenticated' do
      context 'when the user has an idea session in progress' do
        it 'shows the idea session in progress' do
          create(:idea_session, user:)

          get(show_in_progress_api_v1_idea_sessions_path, headers:)
          expect(response).to have_http_status(:ok)
          expect(json['data']['attributes']['isFinished']).to be(false)
        end
      end

      context 'when the user does not have an idea session in progress' do
        it 'returns nil' do
          get(show_in_progress_api_v1_idea_sessions_path, headers:)
          expect(response).to have_http_status(:ok)
          expect(json).to be_nil
        end
      end
    end

    context 'when unauthenticated' do
      it 'returns unauthorized status' do
        get show_in_progress_api_v1_idea_sessions_path, headers: {}
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe 'POST /api/v1/idea_sessions' do
    context 'when authenticated' do
      context 'when valid request' do
        it 'creates a new idea session' do
          post(api_v1_idea_sessions_path, params: { idea_session: { uuid: 'uuid' } },
                                          headers:)
          expect(response).to have_http_status(:ok)
          expect(json['data']['attributes']['uuid']).to eq('uuid')
        end
      end

      context 'when invalid request (without uuid)' do
        it 'returns unprocessable_entity status' do
          post(api_v1_idea_sessions_path, params: { idea_session: { uuid: '' } }, headers:)
          expect(response).to have_http_status(:unprocessable_entity)
          expect(json['errors']).to include('UUIDを入力してください')
        end
      end
    end

    context 'when unauthenticated' do
      it 'returns unauthorized status' do
        post api_v1_idea_sessions_path, params: { idea_session: { uuid: 'uuid' } }, headers: {}
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe 'PATCH /api/v1/idea_sessions/:uuid' do
    context 'when authenticated' do
      context 'when valid request' do
        it 'updates the idea session' do
          idea_session = create(:idea_session, user:)

          patch(api_v1_idea_session_path(idea_session.uuid),
                params: { idea_session: { is_finished: true } }, headers:)
          expect(response).to have_http_status(:ok)
          expect(json['data']['attributes']['isFinished']).to be(true)
        end
      end

      context 'when invalid request' do
        it 'returns unprocessable_entity status' do
          idea_session = create(:idea_session, user:)

          patch(api_v1_idea_session_path(idea_session.uuid),
                params: { idea_session: { uuid: '' } }, headers:)
          expect(response).to have_http_status(:unprocessable_entity)
          expect(json['errors']).to include('UUIDを入力してください')
        end
      end
    end

    context 'when unauthenticated' do
      it 'returns unauthorized status' do
        idea_session = create(:idea_session, user:)

        patch api_v1_idea_session_path(idea_session.uuid),
              params: { idea_session: { is_finished: true } }, headers: {}
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe 'DELETE /api/v1/idea_sessions/:uuid' do
    context 'when authenticated' do
      it 'deletes the idea session' do
        idea_session = create(:idea_session, user:)

        delete(api_v1_idea_session_path(idea_session.uuid), headers:)
        expect(response).to have_http_status(:ok)
        expect(json['message']).to eq('データ削除に成功しました。')
      end
    end

    context 'when unauthenticated' do
      it 'returns unauthorized status' do
        idea_session = create(:idea_session, user:)

        delete api_v1_idea_session_path(idea_session.uuid), headers: {}
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe 'GET /api/v1/idea_sessions/show_latest_two_with_memos' do
    context 'when authenticated' do
      context 'when the user has idea sessions' do
        before do
          idea_session1 = create(:idea_session, user:)
          idea_session2 = create(:idea_session, user:)
          create(:idea_memo, idea_session: idea_session1)
          create(:idea_memo, idea_session: idea_session2)
        end

        it 'returns the latest two idea sessions with memos' do
          get(show_latest_two_with_memos_api_v1_idea_sessions_path, headers:)
          expect(response).to have_http_status(:ok)
          expect(json['data'].length).to eq(2)
        end
      end

      context 'when the user does not have idea sessions' do
        it 'returns not_found status' do
          get(show_latest_two_with_memos_api_v1_idea_sessions_path, headers:)
          expect(response).to have_http_status(:not_found)
          expect(json['error']).to eq('対象のidea_sessionデータが見つかりませんでした。')
        end
      end
    end

    context 'when unauthenticated' do
      it 'returns unauthorized status' do
        get show_latest_two_with_memos_api_v1_idea_sessions_path, headers: {}
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
