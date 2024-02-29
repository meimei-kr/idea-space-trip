module Api
  module V1
    class IdeaSessionsController < ApplicationController
      def show_in_progress
        idea_session = @current_user.idea_sessions.where('user_id = ? and is_finished = ?',
                                                         @current_user.id, false)
        render json: idea_session
      end

      def index; end

      def show
        idea_session = set_idea_session
        render json: idea_session
      end

      def create
        idea_session = @current_user.idea_sessions.new(idea_session_params)
        if idea_session.save
          render json: idea_session, status: :created
        else
          render json: idea_session.errors, status: :unprocessable_entity
        end
      end

      def update
        idea_session = set_idea_session
        if idea_session.update(idea_session_params)
          render json: idea_session, status: :ok
        else
          render json: idea_session.errors, status: :unprocessable_entity
        end
      end

      def destroy
        idea_session = set_idea_session
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
