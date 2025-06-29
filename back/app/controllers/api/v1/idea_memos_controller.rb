module Api
  module V1
    class IdeaMemosController < ApplicationController
      include Api::V1::IdeaSetter

      before_action :set_idea_session, only: %i[all_in_session create]
      before_action :set_idea_memo, only: %i[show update destroy]

      def index
        idea_memos = policy_scope(current_user.idea_memos.includes(:idea_session)
                      .order(created_at: :desc))
        render_idea_memos(idea_memos)
      end

      def index_with_filters
        query = params[:query] || ''
        page = (params[:page] || 1).to_i
        favorites_mode = params[:favorites_mode] == 'true'
        idea_memos = ::FilteredIdeaMemosByQuery.call(
          current_user.idea_memos.includes(:idea_session),
          query, page, favorites_mode, current_user
        )
        render_idea_memos(idea_memos)
      end

      def show
        if @idea_memo.nil?
          render json: { error: '指定されたアイデアメモが見つかりません' }, status: :not_found
        else
          authorize @idea_memo
          render json: IdeaMemoSerializer.new(@idea_memo,
                                              { params: { current_user: current_user },
                                                include: [:idea_session] })
                                         .serializable_hash.to_json,
                 status: :ok
        end
      end

      def create
        authorize @idea_session, :record_owner?
        idea_memo = @idea_session.idea_memos.new(idea_memo_params)

        if idea_memo.save
          render json: IdeaMemoSerializer.new(idea_memo,
                                              { params: { current_user: current_user } })
                                         .serializable_hash.to_json, status: :ok
        else
          render json: { errors: idea_memo.errors.full_messages },
                 status: :unprocessable_entity
        end
      end

      def all_in_session
        idea_memos = policy_scope(@idea_session.idea_memos)

        if idea_memos.empty?
          render json: nil, status: :ok
        else
          render json: IdeaMemoSerializer.new(idea_memos,
                                              { params: { current_user: current_user } })
                                         .serializable_hash.to_json, status: :ok
        end
      end

      def update
        authorize @idea_memo
        @idea_memo.update(idea_memo_params)
        if @idea_memo.save
          render json: { message: 'アイデアメモの更新に成功しました' }, status: :ok
        else
          render json: { errors: @idea_memo.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        authorize @idea_memo
        @idea_memo.destroy!
        render json: { message: 'アイデアメモの削除に成功しました' }, status: :ok
      rescue ActiveRecord::RecordNotDestroyed => e
        render json: { error: e.message }, status: :unprocessable_entity
      end

      def this_month_count
        count = current_user.idea_memos
                            .where(
                              idea_memos: { created_at: Time.current.beginning_of_month.. }
                            )
                            .count
        render json: { count: }, status: :ok
      end

      def total_pages_with_filters
        query = params[:query] || ''
        favorites_mode = params[:favorites_mode] == 'true'
        total_memos = ::FilteredTotalPagesByQuery.call(
          current_user.idea_memos.includes(:idea_session), query, favorites_mode, current_user
        )
        total_pages = (total_memos.to_f / Constants::ITEMS_PER_PAGE).ceil
        render json: { pages: total_pages }, status: :ok
      end

      private

      def idea_memo_params
        params.require(:idea_memo).permit(:perspective, :hint, :answer, :comment)
      end

      def render_idea_memos(idea_memos)
        if idea_memos.empty?
          render json: nil, status: :ok
        else
          render json: IdeaMemoSerializer.new(idea_memos,
                                              { params: { current_user: current_user },
                                                include: [:idea_session] })
                                         .serializable_hash.to_json,
                 status: :ok
        end
      end
    end
  end
end
