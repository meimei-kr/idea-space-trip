# == Schema Information
#
# Table name: ai_generated_answers
#
#  id              :bigint           not null, primary key
#  perspective     :integer          not null
#  hint            :text             not null
#  answer          :text             not null
#  idea_session_id :bigint           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class AiGeneratedAnswer < ApplicationRecord
  belongs_to :idea_session

  validates :perspective, presence: true
  validates :hint, presence: true
  validates :answer, presence: true

  attribute :perspective, :integer
  enum :perspective,
       { modify: 10, substitute: 20, reverse: 30, combine: 40, magnify: 50, minify: 60 },
       prefix: true

  # OpenAIのレスポンスを受け取り、AIが生成したアイデアを保存する
  def self.create_from_openai_response(ai_ideas, idea_session)
    ActiveRecord::Base.transaction do
      saved_ai_generated_answers = []
      hashed_ai_ideas = parse_json_to_hash(ai_ideas)

      hashed_ai_ideas.each do |perspective, hints_and_answers|
        perspective_key = convert_perspective_to_enum_key(perspective)
        hints_and_answers.each do |hint, answer|
          saved_answer = idea_session.ai_generated_answers.create!(
            perspective: AiGeneratedAnswer.perspectives[perspective_key],
            hint: extract_hint(hint),
            answer:
          )
          saved_ai_generated_answers << saved_answer
        end
      end

      saved_ai_generated_answers
    end
  rescue ActiveRecord::RecordInvalid => e
    Rails.logger.error("AIが生成したアイデアの保存に失敗しました。#{e.message}\n#{e.backtrace.join("\n")}")
    raise # 捕捉した例外をそのまま再スロー
  end

  # JSONからハッシュに変換する
  def self.parse_json_to_hash(json)
    JSON.parse(json, symbolize_names: true)
  rescue JSON::ParserError => e
    Rails.logger.error("JSONのパースに失敗しました。#{e.message}\n#{e.backtrace.join("\n")}")
  end

  # 　ヒント内から「」で囲まれた部分を抽出する
  def self.extract_hint(full_hint)
    match = full_hint.match(/「(.*?)」/)
    match[1] if match
  end

  # perspectiveをenumのキーに変換する
  def self.convert_perspective_to_enum_key(perspective_ja)
    perspective_key = Constants::PERSPECTIVE_MAPPING[perspective_ja]
    perspective_key || nil
  end
end
