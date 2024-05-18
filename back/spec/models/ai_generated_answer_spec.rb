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
require 'rails_helper'

RSpec.describe AiGeneratedAnswer do
  # アソシエーションのテスト
  describe 'association' do
    it { is_expected.to belong_to(:idea_session) }
  end

  # バリデーションのテスト
  describe 'validation' do
    it 'is valid with valid attributes' do
      ai_generated_answer = build(:ai_generated_answer)
      expect(ai_generated_answer).to be_valid
    end

    it 'is invalid without perspective' do
      ai_generated_answer = build(:ai_generated_answer, perspective: nil)
      expect(ai_generated_answer).not_to be_valid
    end

    it 'is invalid without hint' do
      ai_generated_answer = build(:ai_generated_answer, hint: nil)
      expect(ai_generated_answer).not_to be_valid
    end

    it 'is invalid without answer' do
      ai_generated_answer = build(:ai_generated_answer, answer: nil)
      expect(ai_generated_answer).not_to be_valid
    end
  end

  # クラスメソッドのテスト
  # # OpenAIのレスポンスを受け取り、AIが生成したアイデアを保存するメソッドのテスト
  describe '.create_from_openai_response' do
    # rubocop:disable RSpec/ExampleLength, RSpec/MultipleExpectations, Layout/LineLength
    let!(:idea_session) { create(:idea_session) }
    let!(:ai_ideas) do
      '
        {
          "逆転": {
            "「書き心地」の逆転": "従来の滑らかな書き心地ではなく、書いた文字に微細な凹凸やテクスチャーを与えることで、書き手によりリアルな手書き感を提供する",
            "「デザイン」の逆転": "伝統的な直線形のデザインを捨て、曲線や不規則な形状を取り入れることで、ユニークで個性的な外観を持つボールペンを提供する",
            "「利用目的」の逆転": "単なる書き具としての機能だけでなく、ストレス解消やリラックス効果をもたらす特殊なデザインや機能を搭載し、ユーザーの生活を豊かにするボールペンを提供する"
          },
          "代用": {
            "「書く対象」の代用": "従来の紙だけでなく、スマートフォンやタブレットなどのデジタルデバイスの画面上にも書き込めるボールペンを開発する",
            "「素材」の代用": "環境に配慮し、竹や再生プラスチックなどのサステナブルな素材を使用して、従来のプラスチック製ボールペンと同等の性能を持つボールペンを提供する",
            "「インク」の代用": "従来のインクに代わり、香りつきインクや温度や湿度によって色が変化する特殊なインクを使用し、ユーザーに新しい書き体験を提供する"
          },
          "結合": {
            "「他の文房具」と結合": "ボールペンに加えて鉛筆や消しゴムが一体となったマルチツールを開発し、ユーザーが様々な用途に対応できるようにする",
            "「視覚効果」と結合": "書くときに色が変わるインクや暗闇で光る特殊なインクを採用し、ユーザーに独自の表現手段を提供するボールペンを開発する",
            "「デジタル機能」と結合": "書いた内容をデジタル化できる機能を搭載したボールペンを開発し、ユーザーが手書きメモをスキャンして保存したり、Bluetooth接続で他のデバイスと連携できるようにする"
          }
        }
      '
    end

    it 'creates AiGeneratedAnswer records' do
      result = described_class.create_from_openai_response(ai_ideas, idea_session)

      expect(result.size).to eq(9)

      expect(result[0].perspective).to eq('reverse')
      expect(result[0].hint).to eq('書き心地')
      expect(result[0].answer).to eq('従来の滑らかな書き心地ではなく、書いた文字に微細な凹凸やテクスチャーを与えることで、書き手によりリアルな手書き感を提供する')
      expect(result[1].perspective).to eq('reverse')
      expect(result[1].hint).to eq('デザイン')
      expect(result[1].answer).to eq('伝統的な直線形のデザインを捨て、曲線や不規則な形状を取り入れることで、ユニークで個性的な外観を持つボールペンを提供する')
      expect(result[2].perspective).to eq('reverse')
      expect(result[2].hint).to eq('利用目的')
      expect(result[2].answer).to eq('単なる書き具としての機能だけでなく、ストレス解消やリラックス効果をもたらす特殊なデザインや機能を搭載し、ユーザーの生活を豊かにするボールペンを提供する')

      expect(result[3].perspective).to eq('substitute')
      expect(result[3].hint).to eq('書く対象')
      expect(result[3].answer).to eq('従来の紙だけでなく、スマートフォンやタブレットなどのデジタルデバイスの画面上にも書き込めるボールペンを開発する')
      expect(result[4].perspective).to eq('substitute')
      expect(result[4].hint).to eq('素材')
      expect(result[4].answer).to eq('環境に配慮し、竹や再生プラスチックなどのサステナブルな素材を使用して、従来のプラスチック製ボールペンと同等の性能を持つボールペンを提供する')
      expect(result[5].perspective).to eq('substitute')
      expect(result[5].hint).to eq('インク')
      expect(result[5].answer).to eq('従来のインクに代わり、香りつきインクや温度や湿度によって色が変化する特殊なインクを使用し、ユーザーに新しい書き体験を提供する')

      expect(result[6].perspective).to eq('combine')
      expect(result[6].hint).to eq('他の文房具')
      expect(result[6].answer).to eq('ボールペンに加えて鉛筆や消しゴムが一体となったマルチツールを開発し、ユーザーが様々な用途に対応できるようにする')
      expect(result[7].perspective).to eq('combine')
      expect(result[7].hint).to eq('視覚効果')
      expect(result[7].answer).to eq('書くときに色が変わるインクや暗闇で光る特殊なインクを採用し、ユーザーに独自の表現手段を提供するボールペンを開発する')
      expect(result[8].perspective).to eq('combine')
      expect(result[8].hint).to eq('デジタル機能')
      expect(result[8].answer).to eq('書いた内容をデジタル化できる機能を搭載したボールペンを開発し、ユーザーが手書きメモをスキャンして保存したり、Bluetooth接続で他のデバイスと連携できるようにする')
    end
    # rubocop:enable RSpec/ExampleLength, RSpec/MultipleExpectations, Layout/LineLength
  end

  # JSONからハッシュに変換するメソッドのテスト
  describe '.parse_json_to_hash' do
    # rubocop:disable RSpec/ExampleLength
    it 'parses json to hash' do
      json =
        '
          {
            "test": {
              "test1": "test1です",
              "test2": "test2です",
              "test3": "test3です"
            }
          }
        '

      expected_hash = {
        test: {
          test1: 'test1です',
          test2: 'test2です',
          test3: 'test3です'
        }
      }

      expect(described_class.parse_json_to_hash(json)).to eq(expected_hash)
    end
    # rubocop:enable RSpec/ExampleLength
  end

  # ヒント内から「」で囲まれた部分を抽出するメソッドのテスト
  describe '.extract_hint' do
    it 'extracts hint from full hint' do
      full_hint = '「書き心地」の逆転'
      extracted_hint = '書き心地'

      expect(described_class.extract_hint(full_hint)).to eq(extracted_hint)
    end
  end

  # perspectiveをenumのキーに変換するメソッドのテスト
  describe '.convert_perspective_to_enum_key' do
    it 'convers japanese perspective to enum key' do
      perspective_ja = '逆転'
      expected_key = Constants::PERSPECTIVE_MAPPING[perspective_ja]

      expect(described_class.convert_perspective_to_enum_key(perspective_ja)).to eq(expected_key)
    end

    it 'returns nil when the perspective is not found' do
      perspective_ja = 'test'

      expect(described_class.convert_perspective_to_enum_key(perspective_ja)).to be_nil
    end
  end
end
