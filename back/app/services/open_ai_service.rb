class OpenAiService
  def initialize(model: 'gpt-3.5-turbo', timeout: 10)
    @model = model
    @connection = Faraday.new(url: 'https://api.openai.com/v1/chat/completions') do |faraday|
      faraday.headers['Authorization'] = "Bearer #{Rails.application.credentials.open_ai[:api_key]}"
      faraday.headers['Content-Type'] = 'application/json'
      faraday.options[:timeout] = timeout
      faraday.adapter Faraday.default_adapter
    end
  end

  # OpenAIにリクエストを送信する
  def call(input)
    prompt = load_prompt(input)
    user_input = build_user_input(input)
    body = build_body(prompt, user_input)
    response = @connection.post { |req| req.body = body }
    handle_response_errors(response)
    JSON.parse(response.body)['choices'][0]['message']['content']
  rescue Faraday::TimeoutError
    raise TimeoutError, 'リクエストがタイムアウトしました。もう一度お試しください。'
  end

  private

  # リクエストボディを作成する
  def build_body(prompt, user_input)
    {
      model: @model,
      max_tokens: 1000,
      temperature: 1.0,
      messages: [
        { role: 'system', content: prompt },
        { role: 'user', content: user_input }
      ]
    }.to_json
  end

  # レスポンスエラーを処理する
  def handle_response_errors(response)
    case response.status
    when 200
      nil
    when 401
      raise UnauthorizedError, 'APIキーが無効です。'
    when 429
      raise TooManyRequestsError, 'リクエストが多すぎます。'
    when 500
      raise InternalServerError, 'サーバーエラーが発生しました。'
    when 503
      raise ServiceUnavailableError, 'サービスが利用できません。'
    else
      raise StandardError, '予期せぬエラーが発生しました。'
    end
  end

  # プロンプトを読み込む
  def load_prompt(input)
    prompt_path = Rails.root.join('lib/data/prompts.yml')
    prompts = YAML.load_file(prompt_path)

    case input[:type]
    when 'theme'
      prompts['theme_prompt_template']
    when 'idea'
      prompts['idea_prompt_template']
      # その他の入力タイプは存在しないのでデフォルトの挙動はなし
    end
  end

  # ユーザー入力を設定する
  def build_user_input(input)
    case input[:type]
    when 'theme'
      "
        # 入力
        カテゴリ： #{input[:data][:theme_category]}
        質問： #{input[:data][:theme_question]}
        回答： #{input[:data][:theme_answer]}
      "
    when 'idea'
      "
        # 入力
        観点： #{input[:data][:perspectives]}
        テーマ： #{input[:data][:theme]}
      "
    end
  end
end
