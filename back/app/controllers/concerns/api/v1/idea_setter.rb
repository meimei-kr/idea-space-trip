module Api
  module V1
    module IdeaSetter
      extend ActiveSupport::Concern

      private

      def set_idea_session
        @idea_session = @current_user.idea_sessions.find_by(uuid: params[:idea_session_uuid])
        render json: { error: '指定されたアイデアセッションが見つかりません' }, status: :not_found if @idea_session.nil?
      end

      def set_idea_memo
        @idea_memo = @current_user.idea_memos.find_by(uuid: params[:uuid])
      end
    end
  end
end
