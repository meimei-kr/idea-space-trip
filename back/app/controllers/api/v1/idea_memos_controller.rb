module Api
  module V1
    class IdeaMemosController < ApplicationController
      def index
        idea_memos = policy_scope(@current_user.idea_memos.includes(:idea_session)
                      .order(created_at: :desc))

        if idea_memos.empty?
          render json: nil, status: :ok
        else
          render json: IdeaMemoSerializer.new(idea_memos, include: [:idea_session])
                                         .serializable_hash.to_json,
                 status: :ok
        end
      end

      def index_with_filters
        query = params[:query] || ''
        page = params[:page].to_i || 1
        puts query
        puts query.class
        puts page
        puts page.class
        idea_memos = ::FilteredIdeaMemosByQuery.call(@current_user.idea_memos, query, page)

        if idea_memos.empty?
          render json: nil, status: :ok
        else
          render json: IdeaMemoSerializer.new(idea_memos, include: [:idea_session])
                                          .serializable_hash.to_json,
                  status: :ok
        end
      end

      def show
        set_idea_memo
        if @idea_memo.nil?
          render json: { error: '指定されたアイデアメモが見つかりません' }, status: :not_found
        else
          authorize @idea_memo
          render json: IdeaMemoSerializer.new(@idea_memo, include: [:idea_session])
                                         .serializable_hash.to_json,
                 status: :ok
        end
      end

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

      def update
        set_idea_memo
        authorize @idea_memo
        @idea_memo.update(idea_memo_params)
        if @idea_memo.save
          render json: { message: 'アイデアメモの更新に成功しました' }, status: :ok
        else
          render json: { errors: @idea_memo.errors }, status: :unprocessable_entity
        end
      end

      def destroy
        set_idea_memo
        authorize @idea_memo
        @idea_memo.destroy!
        render json: { message: 'アイデアメモの削除に成功しました' }, status: :ok
      rescue ActiveRecord::RecordNotDestroyed => e
        render json: { error: e.message }, status: :unprocessable_entity
      end

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

      def set_idea_memo
        @idea_memo = @current_user.idea_memos.find_by(uuid: params[:uuid])
      end

      def idea_memo_params
        params.require(:idea_memo).permit(:perspective, :hint, :answer, :comment)
      end
    end
  end
end
