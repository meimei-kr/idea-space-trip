class AiUsageHistoryPolicy < ApplicationPolicy
  # ユーザーがログインしているかどうかを確認
  def general_check?
    user.present?
  end

  # ログイン中のユーザーがレコードの所有者かどうかを確認
  def record_owner?
    record.user_id == user.id
  end

  def show?
    general_check?
  end

  def update?
    general_check? && record_owner?
  end
end
