require 'rails_helper'

RSpec.describe 'IdeaMemos API' do
  let!(:user) { create(:user) }
  let!(:token) { encode_jwt({ user_id: user.id, exp: 24.hours.from_now.to_i }) }
  let!(:headers) { { Authorization: "Bearer #{token}" } }
  let!(:idea_session) { create(:idea_session, user:) }

  describe 'GET /api/v1/idea_memos' do
    context 'when authenticated' do
      context 'when the user does not have idea memos' do
        it 'returns nil' do
          get(api_v1_idea_memos_path, headers:)
          expect(response).to have_http_status(:ok)
          expect(json).to be_nil
        end
      end

      context 'when the user has idea memos' do
        it 'returns idea memos' do
          create_list(:idea_memo, 3, idea_session:)

          get(api_v1_idea_memos_path, headers:)
          expect(response).to have_http_status(:ok)
          expect(json['data'].length).to eq(3)
        end
      end
    end

    context 'when unauthenticated' do
      it 'returns unauthorized status' do
        create_list(:idea_memo, 3, idea_session:)

        get api_v1_idea_memos_path, headers: {}
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe 'GET /api/v1/idea_memos/index_with_filters' do
    context 'when authenticated' do
      context 'when the params do not include query' do
        it 'returns all idea memos' do
          create_list(:idea_memo, 3, idea_session:)

          get(index_with_filters_api_v1_idea_memos_path,
              params: { query: '', page: 1, favorites_mode: false }, headers:)
          expect(response).to have_http_status(:ok)
          expect(json['data'].length).to eq(3)
        end
      end

      context 'when the params include the page number that does not have idea memos' do
        it 'returns nil' do
          create_list(:idea_memo, 3, idea_session:)

          get(index_with_filters_api_v1_idea_memos_path,
              params: { query: 'test', page: 2, favorites_mode: false }, headers:)
          expect(response).to have_http_status(:ok)
          expect(json).to be_nil
        end
      end

      context 'when favorites_mode is true' do
        it 'returns favorite idea memos' do
          create_list(:idea_memo, 3, idea_session:)
          create(:idea_like, user:, idea_memo: user.idea_memos.first)

          get(index_with_filters_api_v1_idea_memos_path,
              params: { query: '', page: 1, favorites_mode: true }, headers:)
          expect(response).to have_http_status(:ok)
          expect(json['data'].length).to eq(1)
          expect(json['data'][0]['id'].to_i).to eq(user.idea_memos.first.id)
        end
      end
    end

    context 'when unauthenticated' do
      it 'returns unauthorized status' do
        create_list(:idea_memo, 3, idea_session:)

        get index_with_filters_api_v1_idea_memos_path,
            params: { query: '', page: 1, favorites_mode: false }, headers: {}
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe 'GET /api/v1/idea_memos/:uuid' do
    context 'when authenticated' do
      context 'when the idea memo does not exist' do
        it 'returns not found status' do
          get(api_v1_idea_memo_path(uuid: 'test'), headers:)
          expect(response).to have_http_status(:not_found)
        end
      end

      context 'when the idea memo exists' do
        let!(:idea_memo) { create(:idea_memo, idea_session:) }

        it 'returns the idea memo' do
          get(api_v1_idea_memo_path(uuid: idea_memo.uuid), headers:)
          expect(response).to have_http_status(:ok)
          expect(json['data']['id'].to_i).to eq(idea_memo.id)
        end
      end
    end

    context 'when unauthenticated' do
      let!(:idea_memo) { create(:idea_memo, idea_session:) }

      it 'returns unauthorized status' do
        get api_v1_idea_memo_path(uuid: idea_memo.uuid), headers: {}
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe 'POST /api/v1/idea_sessions/:idea_session_uuid/idea_memos' do
    context 'when authenticated' do
      context 'when the idea memo params are valid' do
        it 'creates an idea memo' do
          post(api_v1_idea_session_idea_memos_path(idea_session_uuid: idea_session.uuid),
               params: { idea_memo: { perspective: 'reverse', hint: 'test hint',
                                      answer: 'test answer' } },
               headers:)
          expect(response).to have_http_status(:ok)
          expect(json['data']['attributes']['perspective']).to eq('reverse')
          expect(json['data']['attributes']['hint']).to eq('test hint')
          expect(json['data']['attributes']['answer']).to eq('test answer')
        end
      end

      context 'when the idea memo params are invalid' do
        it 'returns validation errors' do
          post(api_v1_idea_session_idea_memos_path(idea_session_uuid: idea_session.uuid),
               params: { idea_memo: { perspective: 'reverse', hint: 'test hint',
                                      answer: '' } },
               headers:)
          expect(response).to have_http_status(:unprocessable_entity)
          expect(json['errors']).to include('回答を入力してください')
        end
      end
    end

    context 'when unauthenticated' do
      it 'returns unauthorized status' do
        post api_v1_idea_session_idea_memos_path(idea_session_uuid: idea_session.uuid),
             params: { idea_memo: { perspective: 'reverse', hint: 'test hint',
                                    answer: 'test answer' } },
             headers: {}
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe 'GET /api/v1/idea_sessions/:idea_session_uuid/idea_memos/all_in_session' do
    context 'when authenticated' do
      context 'when the idea session does not have idea memos' do
        it 'returns nil' do
          get(
            api_v1_idea_session_idea_memos_all_in_session_path(
              idea_session_uuid: idea_session.uuid
            ),
            headers:
          )
          expect(response).to have_http_status(:ok)
          expect(json).to be_nil
        end
      end

      context 'when the idea session has idea memos' do
        it 'returns idea memos' do
          create_list(:idea_memo, 3, idea_session:)

          get(
            api_v1_idea_session_idea_memos_all_in_session_path(
              idea_session_uuid: idea_session.uuid
            ), headers:
          )
          expect(response).to have_http_status(:ok)
          expect(json['data'].length).to eq(3)
        end
      end
    end

    context 'when unauthenticated' do
      it 'returns unauthorized status' do
        create_list(:idea_memo, 3, idea_session:)

        get(
          api_v1_idea_session_idea_memos_all_in_session_path(idea_session_uuid: idea_session.uuid),
          headers: {}
        )
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe 'PATCH /api/v1/idea_memos/:uuid' do
    let!(:idea_memo) { create(:idea_memo, idea_session:) }

    context 'when authenticated' do
      context 'when idea memo params are valid' do
        it 'updates the idea memo' do
          patch(api_v1_idea_memo_path(uuid: idea_memo.uuid),
                params: { idea_memo: { perspective: 'reverse', hint: 'test hint',
                                       answer: 'test answer' } },
                headers:)
          expect(response).to have_http_status(:ok)
          expect(json['message']).to eq('アイデアメモの更新に成功しました')
          expect(IdeaMemo.find(idea_memo.id).answer).to eq('test answer')
        end
      end

      context 'when idea memo params are invalid' do
        it 'returns validation errors' do
          patch(api_v1_idea_memo_path(uuid: idea_memo.uuid),
                params: { idea_memo: { perspective: 'reverse', hint: 'test hint',
                                       answer: '' } },
                headers:)
          expect(response).to have_http_status(:unprocessable_entity)
          expect(json['errors']).to include('回答を入力してください')
        end
      end
    end

    context 'when unauthenticated' do
      it 'returns unauthorized status' do
        patch api_v1_idea_memo_path(uuid: idea_memo.uuid),
              params: { idea_memo: { perspective: 'reverse', hint: 'test hint',
                                     answer: 'test answer' } },
              headers: {}
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe 'DELETE /api/v1/idea_memos/:uuid' do
    let!(:idea_memo) { create(:idea_memo, idea_session:) }

    context 'when authenticated' do
      it 'deletes the idea memo' do
        delete(api_v1_idea_memo_path(uuid: idea_memo.uuid), headers:)
        expect(response).to have_http_status(:ok)
        expect(json['message']).to eq('アイデアメモの削除に成功しました')
      end
    end

    context 'when unauthenticated' do
      it 'returns unauthorized status' do
        delete api_v1_idea_memo_path(uuid: idea_memo.uuid), headers: {}
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe 'GET /api/v1/idea_memos/this_month_count' do
    let!(:other_idea_session) { create(:idea_session, user:) }

    context 'when authenticated' do
      it 'returns the count of idea memos created this month' do
        create_list(:idea_memo, 3, idea_session:, created_at: Time.current)
        create_list(:idea_memo, 2, idea_session: other_idea_session,
                                   created_at: 1.month.ago)

        get(this_month_count_api_v1_idea_memos_path, headers:)
        expect(response).to have_http_status(:ok)
        expect(json['count']).to eq(3)
      end
    end

    context 'when unauthenticated' do
      it 'returns unauthorized status' do
        create_list(:idea_memo, 3, idea_session:, created_at: Time.current)
        create_list(:idea_memo, 2, idea_session: other_idea_session,
                                   created_at: 1.month.ago)

        get this_month_count_api_v1_idea_memos_path, headers: {}
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe 'GET /api/v1/idea_memos/total_pages_with_filters' do
    context 'when authenticated' do
      context 'when the params include query which does not match all idea memos' do
        it 'returns the total pages as 0' do
          create_list(:idea_memo, Constants::ITEMS_PER_PAGE + 1, idea_session:)

          # The query is 'b' and there are no idea memos with 'b' in the answer
          get(total_pages_with_filters_api_v1_idea_memos_path,
              params: { query: 'b', favorites_mode: false }, headers:)
          expect(response).to have_http_status(:ok)
          expect(json['pages']).to eq(0)
        end
      end

      context 'when the favorites_mode is true' do
        it 'returns the total pages as 1' do
          create_list(:idea_memo, Constants::ITEMS_PER_PAGE + 1, idea_session:)
          Constants::ITEMS_PER_PAGE.times do |i|
            create(:idea_like, user:, idea_memo: user.idea_memos.all[i])
          end

          get(total_pages_with_filters_api_v1_idea_memos_path,
              params: { query: '', favorites_mode: true }, headers:)
          expect(response).to have_http_status(:ok)
          expect(json['pages']).to eq(1)
        end
      end

      context 'when the total pages are 2' do
        it 'returns the total pages as 2' do
          create_list(:idea_memo, Constants::ITEMS_PER_PAGE + 1, idea_session:)

          get(total_pages_with_filters_api_v1_idea_memos_path,
              params: { query: '', favorites_mode: false }, headers:)
          expect(response).to have_http_status(:ok)
          expect(json['pages']).to eq(2)
        end
      end
    end

    context 'when unauthenticated' do
      it 'returns unauthorized status' do
        create_list(:idea_memo, Constants::ITEMS_PER_PAGE + 1, idea_session:)

        get total_pages_with_filters_api_v1_idea_memos_path,
            params: { query: '', favorites_mode: false }, headers: {}
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
