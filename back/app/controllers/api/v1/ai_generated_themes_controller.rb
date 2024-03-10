module Api
  module V1
    class AiGeneratedThemesController < ApplicationController
      def index
        Rails.logger.info params.to_unsafe_h
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

        # テーマ生成
        input = set_input
        themes = ::OpenAiService.new.call(input) # グローバル名前空間にあるOpenAIServiceを参照
        render json: nil and return if themes.casecmp('invalid').zero? # 無効な入力の場合は、nilを返す

        themes_array = themes.split("\n")

        # 生成したテーマを保存し、配列に格納
        ai_generated_themes = []
        ActiveRecord::Base.transaction do
          ai_generated_themes = themes_array.map do |theme|
            @idea_session.ai_generated_themes.create!(theme:)
          end
        end

        # idea_sessionのis_ai_theme_generatedをtrueに更新
        @idea_session.update!(is_ai_theme_generated: true)

        render json: AiGeneratedThemeSerializer.new(ai_generated_themes).serializable_hash.to_json,
               status: :ok
      rescue StandardError => e
        render json: { error: e.message }, status: :unprocessable_entity
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

      def set_input
        {
          type: 'theme',
          data: {
            theme_category: IdeaSession.human_attribute_name(
              "theme_category.#{idea_session_params[:theme_category]}"
            ),
            theme_question: IdeaSession.human_attribute_name(
              "theme_question.#{idea_session_params[:theme_question]}"
            ),
            theme_answer: idea_session_params[:theme_answer]
          }
        }
      end

      # uuidをもとにIdeaSessionを取得
      def set_idea_session
        @idea_session = @current_user.idea_sessions.find_by(uuid: params[:idea_session_uuid])
        authorize @idea_session
      end
    end
  end
end
