class IdeaSessionPolicy < ApplicationPolicy
  class Scope
    def initialize(user, scope)
      @user = user
      @scope = scope
    end

    def resolve
      # ログイン中のユーザーに紐づくデータのみアクセス許可
      scope.where(user_id: user.id)
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

  def show_in_progress?
    general_check? && record_owner?
  end

  def show_latest_two_with_memos?
    general_check? # 複数レコード取得アクションなので、recordに対する認可チェックはできない
  end

  def create?
    general_check?
  end

  def update?
    general_check? && record_owner?
  end

  def destroy?
    general_check? && record_owner?
  end
end
