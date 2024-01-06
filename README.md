## ■サービス概要
「Idea Space Trip」は、AIの誘導によりユーザーにアイデアを広げるヒントを提供します。  
具体的な企画立案の際はもちろん、簡単なトレーニング感覚でも気軽に使用でき、さまざまな視点からアイデアを探求できます。  
考えたアイデアはアプリ内のメモやNotionに保存可能ですので、後から見返して新しいアイデアにつなげることもできます。

## ■ このサービスへの思い・作りたい理由
自分含め多くの人が、解決したい課題や叶えたい願望がある一方、それを実現させるためのアイデアが思いつかず悩んでいます。  
こうした状況を改善したいという思いから、このサービスを開発することにしました。

## ■ ユーザー層について
具体的なアイデアがなかなか思いつかず困っている人

## ■サービスの利用イメージ
### アイデア発想法実践のサポート
このアプリでは、オズボーン・チェックリストのような発想法に沿ってアイデア出しを行う際にAIがサポートします。  
発想法だけでは、具体的な着眼点を見つけるのが難しく、視点も偏りがちです。  
そこで、例えば、「ボールペンの"書き心地"を変更すると？」などと具体的にAIがヒントとなる視点を与えることで、ユーザーが様々な角度からアイデアを発想するのに役立ちます。  
もしアイデアが浮かばない場合、AIが提案する案を参考にすることで、発想の幅を広げることが可能です。

### 音声入力可能
アイデア出しを気軽に行ってもらうために、音声入力にも対応します。

### アイデアメモ
このアプリで出したアイデアは、自動的にアプリ内のアイデアメモに保存されるので、見返して新たなアイデアを発想するきっかけにもなります。  
フリーワード検索により、過去のメモを参照できます。  
お気に入り機能を使って、気に入ったアイデアだけをまとめることもできます。  
また、Notionと連携させて、Notion内のデータベースにアイデアを保存することもできます。

## ■ ユーザーの獲得について
以下の方法などにより、ユーザーの獲得を目指します。
- XでのPR
- スクールコミュニティー内でのPR
- Qiita等で技術記事投稿

## ■ サービスの差別化ポイント・推しポイント
【比較したサービス①】：マインドマップやブレインストーミングツール
[miro](https://miro.com/ja/) / [MindMeister](https://www.mindmeister.com/pages/ja/mind-mapping/)  

【差別化ポイント】
- マインドマップやブレインストーミングのアプリは、自分でさまざまな視点から考えて発想したものを、洗い出して整理するもので、発想を支援するものではない
- アイデア発想法のテンプレートを数多く用意している場合もあるが、初心者はどのような場面でどのテンプレートを使うと良いのか迷ってしまい活用できない  
	→ **このアプリは、アイデア発想法を知らないユーザーでもわかりやすい方法でアイデア出しができるようサポートします。**  
<br>
【比較したサービス②】：アイデア発想支援ツール
[AIひらめきメーカー](https://hirameki.app/) / [閃け！ひらめくん](https://apps.apple.com/jp/app/%E9%96%83%E3%81%91-%E3%81%B2%E3%82%89%E3%82%81%E3%81%8F%E3%82%93/id1502522192)  

【差別化ポイント】
- 上記のサービスは、ランダムなワードの組み合わせによるアイデア発想を促すもの  
　→ **このアプリは、視点を提示することでユーザーにアイデアを発想させるものなので、新たな発想支援ツールとなります。**

## ■ 機能候補
### MVPリリース
- 会員登録・ログイン・ゲストログイン機能
	- Auth.jsを使用して、Google・Notionによる登録・ログイン機能を実装
	- ログインなしで利用できるゲストユーザー機能を実装（1日後削除される）
- アイデア出しセッション機能
	1. テーマが決まっているユーザーはそれを入力。決まっていなければ、簡単な質問に回答してもらい、それをもとにAIがテーマを提案。
	2. テーマをもとに発想のヒントとなる回答の作成をOpenAI APIにより行う。API呼び出しはActive Jobで非同期に実行し、その間もユーザーは自身で答えを考え、セッション続行可能。
	3. 同じテーマについて３回異なる視点で発想してもらうとセッション終了。
- アイデアメモ一覧閲覧機能
- アイデアメモ詳細閲覧機能
- アイデアメモ編集機能
- アイデアメモ削除機能

### 本リリース
- アイデアメモのフリーワード検索機能
- アイデアメモへのお気に入り機能
- Notionデータベースへの保存機能
- PWA対応


## ■ 機能の実装方針予定
| カテゴリー | 使用技術 |
:----|:----
| フロントエンド | Next.js |
| バックエンド | Ruby on Rails APIモード |
| インフラ | Vercel / fly.io |
| DB | MySQL ( PlanetScale ) |
| Redis | Upstash for Redis ( fly.io ) |
| 認証 | Auth.js |
| CI/CD | GitHub Actions |
| 開発環境 | Docker |
| API | Notion API、Web Speech API、OpenAI API |