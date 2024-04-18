class FilteredIdeaMemosByQuery
  attr_reader :relation, :query, :page

  def self.call(relation, query, page, favorites_mode, user)
    new(relation, query, page, favorites_mode, user).call
  end

  def initialize(relation, query, page, favorites_mode, user)
    @relation = relation
    @query = query
    @page = page
    @favorites_mode = favorites_mode
    @user = user
  end

  def call
    perspective_value = extract_perspective_value

    where_clause, parameters = build_conditions(perspective_value)

    if @favorites_mode
      @relation = @relation.joins(:idea_like).where(idea_like: { user_id: @user.id })
    end

    @relation
      .where(where_clause, parameters)
      .order('idea_memos.created_at DESC')
      .limit(Constants::ITEMS_PER_PAGE)
      .offset((@page - 1) * Constants::ITEMS_PER_PAGE)
  end

  private

  def extract_perspective_value
    # ユーザー入力をEnumキーに変換
    enum_key = Constants::PERSPECTIVE_MAPPING[@query.to_sym]

    # Enumキーから対応する整数値を取得
    IdeaMemo.perspectives[enum_key] if enum_key
  end

  # 検索条件構築
  def build_conditions(perspective_value)
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

    [where_clause, parameters]
  end
end
