module Api
  module V1
    class IdeaSessionsController < ApplicationController
      def show_in_progress
        idea_session = policy_scope(@current_user.idea_sessions).where(is_finished: false).first
        if idea_session.nil?
          render json: nil, status: :ok
        else
          authorize idea_session
          render json: IdeaSessionSerializer.new(idea_session).serializable_hash.to_json,
                 status: :ok
        end
      end

      def index; end

      def create
        idea_session = @current_user.idea_sessions.new(idea_session_params)
        authorize idea_session
        if idea_session.save
          render json: IdeaSessionSerializer.new(idea_session).serializable_hash.to_json,
                 status: :ok
        else
          render json: idea_session.errors, status: :unprocessable_entity
        end
      end

      def update
        idea_session = set_idea_session
        authorize idea_session
        if idea_session.update(idea_session_params)
          render json: IdeaSessionSerializer.new(idea_session).serializable_hash.to_json,
                 status: :ok
        else
          render json: idea_session.errors, status: :unprocessable_entity
        end
      end

      def destroy
        idea_session = set_idea_session
        authorize idea_session
        idea_session.destroy!
        render json: { message: 'データ削除に成功しました。' }, status: :ok
      end

      private

      def idea_session_params
        params.require(:idea_session).permit(
          :uuid,
          :is_theme_determined,
          :is_ai_theme_generated,
          :category,
          :question,
          :question,
          :is_ai_answer_generated,
          :theme,
          :is_finished,
          :user_id
        )
      end

      def set_idea_session
        @current_user.idea_sessions.find_by(uuid: params[:uuid])
      end
    end
  end
end
