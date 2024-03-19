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

  def record_owner?
    # ログイン中のユーザーに紐づくデータのみアクセス許可
    record.idea_session.user_id == user.id
  end

  def show?
    general_check? && record_owner?
  end

  def update?
    general_check? && record_owner?
  end

  def destroy?
    general_check? && record_owner?
  end
end
