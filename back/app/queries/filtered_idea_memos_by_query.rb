class FilteredIdeaMemosByQuery
  attr_reader :relation, :query, :page

  def self.call(relation, query, page)
    new(relation, query, page).call
  end

  def initialize(relation, query, page)
    @relation = relation
    @query = query
    @page = page
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

    @relation
      .joins(:idea_session)
      .where(where_clause, parameters)
      .order('idea_memos.created_at DESC')
      .limit(Constants::ITEMS_PER_PAGE)
      .offset((@page - 1) * Constants::ITEMS_PER_PAGE)
  end
end
