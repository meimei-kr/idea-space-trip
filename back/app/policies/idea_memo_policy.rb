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
end
