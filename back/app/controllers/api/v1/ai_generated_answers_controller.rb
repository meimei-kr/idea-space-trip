module Api
  module V1
    class AiGeneratedAnswersController < ApplicationController
      def index
        set_idea_session
        ai_generated_answers = policy_scope(@idea_session.ai_generated_answers).order(:created_at)

        if ai_generated_answers.empty?
          render json: nil, status: :ok
        else
          render json: AiGeneratedAnswerSerializer
            .new(ai_generated_answers)
            .serializable_hash.to_json,
                 status: :ok
        end
      end

      def create
        input = build_input(params[:user_input])
        if AiIdeaGenerationJob.perform_later(@current_user.id, input)
          head :ok
        else
          render json: { error: 'ジョブキューへの追加に失敗しました' }, status: :internal_server_error
        end
      end

      def destroy_all
        set_idea_session
        @idea_session.ai_generated_answers.destroy_all
        head :ok
      end

      private

      # uuidをもとにIdeaSessionを取得
      def set_idea_session
        @idea_session = @current_user.idea_sessions.find_by(uuid: params[:idea_session_uuid])
        return unless @idea_session.nil?

        render json: { error: '指定されたアイデアセッションが見つかりません' }, status: :not_found
        nil
      end

      def build_input(user_input)
        {
          type: 'idea',
          data: {
            perspectives: user_input[:perspectives],
            theme: user_input[:theme]
          }
        }
      end
    end
  end
end
