module Api
  module V1
    class IdeaLikesController < ApplicationController
      def create
        set_idea_memo
        if @current_user.like(@idea_memo)
          render json: { status: :ok }
        else
          render json: { error: 'お気に入り登録に失敗しました' }, status: :unprocessable_entity
        end
      end

      def destroy
        set_idea_memo
        if @current_user.unlike(@idea_memo)
          render json: { status: :ok }
        else
          render json: { error: 'お気に入り解除に失敗しました' }, status: :unprocessable_entity
        end
      end

      private

      def set_idea_memo
        @idea_memo = @current_user.idea_memos.find_by(uuid: params[:idea_memo_uuid])
      end
    end
  end
end
