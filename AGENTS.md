# AGENTS

これは RS の Marp スライドテンプレートです。本ファイルを対話のはじめに読み、ここに書かれた方針でスライドを作ります。

## 運用（最優先）

- 特に指定がなければ、`theme/example.md` に示された標準デザインから選んで作る
- HTML をふんだんに使ってよい。レイアウトや図はクラス付きの `<div>` などで自由に組む
- 調整・カスタムは、作成中の資料側に、無ければ `custom.css` を作成し、そこに書く。テンプレ（`theme/*`）を先に直さない。まず現物で実現し、動くものを確認する
- その調整がテンプレに値すると判断したら、ユーザに次の3択で聞く：
  - (1) いま `theme/style.css` に移植して版数を bump する
  - (2) 後でまとめて反映する（候補を控え、区切りで提案）
  - (3) 反映しない
- `theme/example.md` に無い汎用スライドや、本 AGENTS.md に無い指示・気づきが出たときも、同じ3択で「テンプレ／AGENTS に反映するか」を聞く

## バージョン

- テーマ名は版数つき：`rs-marp-theme-vMAJOR.MINOR.PATCH`（現行 `rs-marp-theme-v0.1.0`）
- `theme/style.css` を変えたら版数を上げ、`theme/example.md`（と `frontend` のシード）のヘッダも合わせる
- 資料側は `custom.css` の `@import` で版を pin する（下記）

## カラー

- `--color-bg` `#FAFAFA`
- `--color-black` `#333`
- `--color-primary` `#799BF9`
- `--color-accent` `#FFA775`
- `--color-danger` `#FF5151`

## ファイル

- `theme/style.css` — テンプレ本体（Marp テーマ名 `rs-marp-theme-v0.1.0`）。直接編集はテンプレ更新時のみ
- `theme/example.md` — 部品と書き方の見本。LLM のシステムプロンプトに入れる想定
- `theme/assets/` — テンプレ同梱の図版 SVG（例：`swimlane.svg`）
- 資料側：
  - `custom.css` に `/* @theme custom */` ＋ `@import 'rs-marp-theme-v0.1.0';` ＋ プロジェクト固有の調整を書く。デッキは frontmatter で `theme: custom` を指定
  - SVG 図版は `assets/` に置き、`<img src="assets/*.svg">` で読み込む（md に直書きしない。スタイルは SVG 内に閉じ込める）
  - `.vscode/settings.json` の `markdown.marp.themes` に `style.css` と `custom.css` を登録し、`markdown.marp.enableHtml: true` にする（HTML を使うため必須）

## Marp ヘッダ

- frontmatter に `theme:` を指定する（資料は `custom`、テンプレ見本は `rs-marp-theme-vX.Y.Z`）
- `title:` を必須で入れる（ブラウザのタブ／バーに表示される）

## デザイン方針

- 日本語は明快でシンプルに。抽象度を保ち、文章量は短いほどよい
- 言い換え・要約にすぎない `note` は置かない（新たな意味があるときだけ）
- 英語見出しにしない（「PHASE 1」ではなく「第1弾」）
- 見出しは各スライドの左上。`## <i ...></i> タイトル`（FA アイコン付き）
- 表紙は `_class: title`、章扉は `_class: section`（青背景＋白文字のみ）
- 本文の丸かっこは半角。直前の語との間に半角スペースを入れる（例：計数 (A・B)）
- Fontawesome を CDN で読み込み（`style.css` 内 `@import`）、見出しやポイントをアイコンであしらう
- 色は最小限に
