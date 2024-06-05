require 'rails_helper'

RSpec.describe 'AiGeneratedAnswers API' do
  let!(:user) { create(:user) }
  let!(:token) { encode_jwt({ user_id: user.id, exp: 24.hours.from_now.to_i }) }
  let!(:headers) { { Authorization: "Bearer #{token}" } }
  let!(:idea_session) { create(:idea_session, user:) }

  describe 'GET /api/v1/idea_sessions/:idea_session_uuid/ai_generated_answers' do
    context 'when authenticated' do
      context 'when the idea session does not have AI generated answers' do
        it 'returns nil' do
          get(api_v1_idea_session_ai_generated_answers_path(idea_session_uuid: idea_session.uuid),
              headers:)
          expect(response).to have_http_status(:ok)
          expect(json).to be_nil
        end
      end

      context 'when the idea session has AI generated answers' do
        it 'returns AI generted answers' do
          create_list(:ai_generated_answer, 9, idea_session:)

          get(api_v1_idea_session_ai_generated_answers_path(idea_session_uuid: idea_session.uuid),
              headers:)
          expect(response).to have_http_status(:ok)
          expect(json['data'].length).to eq(9)
        end
      end
    end

    context 'when unauthenticated' do
      it 'returns unauthorized status' do
        get api_v1_idea_session_ai_generated_answers_path(idea_session_uuid: idea_session.uuid),
            headers: {}
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe 'POST /api/v1/idea_sessions/:idea_session_uuid/ai_generated_answers' do
    let!(:user_input) { { perspectives: '逆転、代用、結合', theme: '新しいボールペンの企画案' } }

    before do
      allow(AiIdeaGenerationJob).to receive(:perform_later).and_return(true)
    end

    context 'when authenticated' do
      it 'creates AI generated answers' do
        post(api_v1_idea_session_ai_generated_answers_path(idea_session_uuid: idea_session.uuid),
             params: { user_input: }, headers:)
        expect(response).to have_http_status(:ok)
        expect(json).to be_nil
      end
    end

    context 'when unauthenticated' do
      it 'returns unauthorized status' do
        post api_v1_idea_session_ai_generated_answers_path(idea_session_uuid: idea_session.uuid),
             params: { user_input: }, headers: {}
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe 'DELETE /api/v1/idea_sessions/:idea_session_uuid/ai_generated_answers' do
    context 'when authenticated' do
      it 'deletes all AI generated answers' do
        create_list(:ai_generated_answer, 9, idea_session:)

        delete(api_v1_idea_session_ai_generated_answers_path(idea_session_uuid: idea_session.uuid),
               headers:)
        expect(response).to have_http_status(:ok)
        expect(json).to be_nil
        expect(idea_session.ai_generated_answers).to be_empty
      end
    end

    context 'when unauthenticated' do
      it 'returns unauthorized status' do
        create_list(:ai_generated_answer, 9, idea_session:)

        delete api_v1_idea_session_ai_generated_answers_path(idea_session_uuid: idea_session.uuid),
               headers: {}
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
