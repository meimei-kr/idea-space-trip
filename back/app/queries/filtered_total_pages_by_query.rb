class FilteredTotalPagesByQuery
  attr_reader :relation, :query, :page

  def self.call(relation, query, favorites_mode, user)
    new(relation, query, favorites_mode, user).call
  end

  def initialize(relation, query, favorites_mode, user)
    @relation = relation
    @query = query
    @favorites_mode = favorites_mode
    @user = user
  end

  def call
    # 　ユーザー入力をEnumキーに変換
    enum_key = Constants::PERSPECTIVE_MAPPING[@query.to_sym]

    # Enumキーから対応する整数値を取得
    perspective_value = IdeaMemo.perspectives[enum_key] if enum_key

    # 検索条件構築
    conditions = []
    parameters = {}

    if perspective_value
      conditions << 'idea_memos.perspective = :perspective_value'
      parameters[:perspective_value] = perspective_value
    end
    conditions << 'idea_sessions.theme ILIKE :query'
    conditions << 'idea_memos.hint ILIKE :query'
    conditions << 'idea_memos.answer ILIKE :query'
    conditions << 'idea_memos.comment ILIKE :query'
    parameters[:query] = "%#{@query}%"

    where_clause = conditions.join(' OR ')

    if @favorites_mode
      @relation = @relation.joins(:idea_like).where(idea_like: { user_id: @user.id })
    end

    @relation
      .where(where_clause, parameters)
      .count
  end
end
