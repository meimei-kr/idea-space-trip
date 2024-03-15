class AiIdeaGenerationJob < ApplicationJob
  queue_as :default

  def perform(user_id, input)
    # OpenAI APIを呼び出し、AIアイデアを生成する
    ai_ideas = Openai::OpenAiService.new.call(input)
    # 返ってきたレスポンスを処理する
    process_ai_ideas(ai_ideas, user_id)
  rescue StandardError => e
    handle_error(e, user_id)
  end

  private

  def process_ai_ideas(ai_ideas, user_id)
    # OpenAIからのレスポンスが 'invalid' だった場合の処理
    if ai_ideas == 'invalid'
      ActionCable.server.broadcast "ai_idea_channel_#{user_id}",
                                   { error: '無効な入力です。テーマを変えてみてください。' }
      return
    end

    idea_session = IdeaSession.find_by(user_id:, is_finished: false)
    if idea_session
      broadcast_ai_ideas(ai_ideas, idea_session, user_id)
    else
      Rails.logger.error("対象のidea_sessionsが見つかりませんでした。user_id: #{user_id}")
      ActionCable.server.broadcast "ai_idea_channel_#{user_id}",
                                   { error: '内部エラーが発生しました。管理者にお問い合わせください。' }
    end
  end

  # ActionCableでAIの生成した回答をユーザーに通知する
  def broadcast_ai_ideas(ai_ideas, idea_session, user_id)
    # ai_generated_answersテーブルにAIアイデアを保存する
    ai_generated_answers = AiGeneratedAnswer.create_from_openai_response(ai_ideas, idea_session)
    # 返ってきたレスポンスを、Action Cableを使用してユーザーに通知する
    serialized_data = ai_generated_answers.map do |answer|
      {
        id: answer.id,
        perspective: answer.perspective,
        hint: answer.hint,
        answer: answer.answer,
        ideaSessionId: answer.idea_session_id
      }
    end
    ActionCable.server.broadcast "ai_idea_channel_#{user_id}",
                                 { body: serialized_data }
  end

  # エラーが発生した場合の処理
  def handle_error(error, user_id)
    Rails.logger.error(error.message)
    error_message = case error
                    when ActiveRecord::RecordInvalid
                      'データベースの更新に失敗しました。'
                    when Openai::TimeoutError, Openai::UnauthorizedError,
                         Openai::ServiceUnavailableError, Openai::TooManyRequestsError,
                         Openai::InternalServerError
                      'APIの呼び出しに失敗しました。'
                    else
                      '予期せぬエラーが発生しました。'
                    end
    ActionCable.server.broadcast "ai_idea_channel_#{user_id}", { error: error_message }
  end
end
