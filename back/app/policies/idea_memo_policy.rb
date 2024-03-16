class IdeaMemoPolicy < ApplicationPolicy
  class Scope
    def initialize(user, scope)
      @user = user
      @scope = scope
    end

    def resolve
      # ログイン中のユーザーに紐づくデータのみアクセス許可
      scope.joins(:idea_session).where(idea_sessions: { user_id: user.id })
    end

    private

    attr_reader :user, :scope
  end

  # ユーザーがログインしているかどうかを確認
  def general_check?
    user.present?
  end

  # ログイン中のユーザーがレコードの所有者かどうかを確認
  def record_owner?
    record.user_id == user.id
  end

  def create?
    general_check?
  end

  def all_in_session?
    general_check?
  end
end
