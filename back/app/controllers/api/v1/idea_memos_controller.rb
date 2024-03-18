module Api
  module V1
    class IdeaMemosController < ApplicationController
      def index; end

      def show; end

      def edit; end

      def create
        set_idea_session
        authorize @idea_session, :record_owner?
        idea_memo = @idea_session.idea_memos.new(idea_memo_params)

        if idea_memo.save
          render json: IdeaMemoSerializer.new(idea_memo).serializable_hash.to_json, status: :ok
        else
          render json: { errors: idea_memo.errors }, status: :unprocessable_entity
        end
      end

      def all_in_session
        set_idea_session
        idea_memos = policy_scope(@idea_session.idea_memos)

        if idea_memos.empty?
          render json: nil, status: :ok
        else
          render json: IdeaMemoSerializer.new(idea_memos).serializable_hash.to_json, status: :ok
        end
      end

      def update; end

      def destroy; end

      def this_month_count
        count = @current_user.idea_memos.where('idea_memos.created_at >= ?',
                                               Time.current.beginning_of_month).count
        render json: { count: }, status: :ok
      end

      private

      def set_idea_session
        @idea_session = @current_user.idea_sessions.find_by(uuid: params[:idea_session_uuid])
        return unless @idea_session.nil?

        render json: { error: '指定されたアイデアセッションが見つかりません' }, status: :not_found
        nil
      end

      def idea_memo_params
        params.require(:idea_memo).permit(:perspective, :hint, :answer, :comment)
      end
    end
  end
end
