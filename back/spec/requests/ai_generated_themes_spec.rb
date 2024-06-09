require 'rails_helper'

RSpec.describe 'AiGeneratedThemes API' do
  let!(:user) { create(:user) }
  let!(:token) { encode_jwt({ user_id: user.id, exp: 24.hours.from_now.to_i }) }
  let!(:headers) { { Authorization: "Bearer #{token}" } }
  let!(:idea_session) { create(:idea_session, user:) }

  describe 'GET /api/v1/idea_sessions/:idea_session_uuid/ai_generated_themes' do
    context 'when authenticated' do
      context 'when the idea session does not have AI generated themes' do
        it 'returns nil' do
          get(api_v1_idea_session_ai_generated_themes_path(idea_session_uuid: idea_session.uuid),
              headers:)
          expect(response).to have_http_status(:ok)
          expect(json).to be_nil
        end
      end

      context 'when the idea session has AI generated themes' do
        it 'returns AI generated themes' do
          create_list(:ai_generated_theme, 10, idea_session:)

          get(api_v1_idea_session_ai_generated_themes_path(idea_session_uuid: idea_session.uuid),
              headers:)
          expect(response).to have_http_status(:ok)
          expect(json['data'].length).to eq(10)
        end
      end
    end

    context 'when unauthenticated' do
      it 'returns unauthorized status' do
        get api_v1_idea_session_ai_generated_themes_path(idea_session_uuid: idea_session.uuid),
            headers: {}
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe 'POST /api/v1/idea_sessions/:idea_session_uuid/ai_generated_themes' do
    let!(:params) do
      { idea_session: {
        theme_category: 'アプリ',
        theme_question: 'あなたの好きなものは？',
        theme_answer: '料理、映画、登山'
      } }
    end

    context 'when authenticated' do
      context 'when the themes include invalid responses' do
        it 'returns nil' do
          themes = '999'
          open_ai_service_double = instance_double(Openai::OpenAiService)
          allow(Openai::OpenAiService).to receive(:new).and_return(open_ai_service_double)
          allow(open_ai_service_double).to receive(:call).and_return(themes)

          post(api_v1_idea_session_ai_generated_themes_path(idea_session_uuid: idea_session.uuid),
               params:, headers:)
          expect(response).to have_http_status(:ok)
          expect(json).to be_nil
        end
      end

      context 'when the generated themes are valid' do
        # rubocop:disable RSpec/ExampleLength
        it 'creates AI generated themes' do
          themes =
            '[
            "料理好きがレシピを共有し合い、新たな料理のアイデアを得られる「レシピ交換コミュニティ」を提案するアプリ",
            "映画ファンが映画のロケ地を巡りながら登山を楽しめる「映画ロケ地ツアーガイド」を提供するアプリ",
            "自然の中でアートを楽しむトレッキングイベント開催を支援し、同じ趣味の仲間が集まるコミュニティを構築するアプリ",
            "映画を観ながら料理を楽しむイベントの提案したり、参加者同士が交流できるアプリ",
            "登山仲間をマッチングし、一緒に登山する仲間を見つける「登山仲間マッチングアプリ」",
            "映画に関連した料理を投稿し合うアプリ",
            "自然の中でアートを楽しむ体験を提供するアプリ",
            "映画についてディスカッションする場を提供するアプリ",
            "料理好きがお互いにレシピを競い合うアプリ",
            "自然の中でアートを学ぶワークショップを提案するアプリ"
          ]'
          open_ai_service_double = instance_double(Openai::OpenAiService)
          allow(Openai::OpenAiService).to receive(:new).and_return(open_ai_service_double)
          allow(open_ai_service_double).to receive(:call).and_return(themes)

          post(api_v1_idea_session_ai_generated_themes_path(idea_session_uuid: idea_session.uuid),
               params:, headers:)
          expect(response).to have_http_status(:ok)
          expect(json['data'].length).to eq(10)
          expect(idea_session.reload.is_ai_theme_generated).to be_truthy
        end
        # rubocop:enable RSpec/ExampleLength
      end
    end

    context 'when unauthenticated' do
      it 'returns unauthorized status' do
        post api_v1_idea_session_ai_generated_themes_path(idea_session_uuid: idea_session.uuid),
             params:, headers: {}
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe 'DELETE /api/v1/idea_sessions/:idea_session_uuid/ai_generated_themes' do
    context 'when authenticated' do
      it 'deletes all AI generated themes of the idea session' do
        create_list(:ai_generated_theme, 10, idea_session:)

        delete(api_v1_idea_session_ai_generated_themes_path(idea_session_uuid: idea_session.uuid),
               headers:)
        expect(response).to have_http_status(:ok)
        expect(idea_session.ai_generated_themes.count).to eq(0)
      end
    end

    context 'when unauthenticated' do
      it 'returns unauthorized status' do
        create_list(:ai_generated_theme, 10, idea_session:)

        delete api_v1_idea_session_ai_generated_themes_path(idea_session_uuid: idea_session.uuid),
               headers: {}
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
