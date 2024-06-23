module Api
  module V1
    class AiGeneratedThemesController < ApplicationController
      def index
        set_idea_session

        ai_generated_themes = policy_scope(@idea_session.ai_generated_themes)

        if ai_generated_themes.empty?
          render json: nil, status: :ok
        else
          render json: AiGeneratedThemeSerializer
            .new(ai_generated_themes)
            .serializable_hash.to_json,
                 status: :ok
        end
      end

      def create
        set_idea_session
        authorize @idea_session, :record_owner?

        # テーマ生成
        input = build_input
        themes = Openai::OpenAiService.new.call(input)
        render json: nil and return if themes.include?('999') # 無効な入力の場合は、nilを返す

        themes_array = JSON.parse(themes)

        # 生成したテーマを保存し、配列に格納
        ai_generated_themes = AiGeneratedTheme.create_ai_generated_themes(@idea_session,
                                                                          themes_array)

        render json: AiGeneratedThemeSerializer.new(ai_generated_themes).serializable_hash.to_json,
               status: :ok
      rescue StandardError => e
        render json: { error: e.message }, status: :unprocessable_entity
      end

      def destroy_all
        set_idea_session
        policy_scope(@idea_session.ai_generated_themes).destroy_all
        render json: nil, status: :ok
      end

      private

      # idea_sessionの値をもとにテーマ生成を行うため、idea_sessionの値を許容する
      def idea_session_params
        params.require(:idea_session).permit(
          :theme_category,
          :theme_question,
          :theme_answer
        )
      end

      def build_input
        {
          type: 'theme',
          data: {
            theme_category: I18n.t(
              "activerecord.attributes.idea_session.theme_category.#{idea_session_params[:theme_category]}" # rubocop:disable Layout/LineLength
            ),
            theme_question: I18n.t(
              "activerecord.attributes.idea_session.theme_question.#{idea_session_params[:theme_question]}" # rubocop:disable Layout/LineLength
            ),
            theme_answer: idea_session_params[:theme_answer]
          }
        }
      end

      # uuidをもとにIdeaSessionを取得
      def set_idea_session
        @idea_session = current_user.idea_sessions.find_by(uuid: params[:idea_session_uuid])
        return unless @idea_session.nil?

        render json: { error: '指定されたアイデアセッションが見つかりません' }, status: :not_found
        nil
      end
    end
  end
end
