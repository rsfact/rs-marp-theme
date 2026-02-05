---
marp: true
theme: custom
paginate: true
---

<!-- _class: title -->
<!-- _paginate: false -->

# Minimal **Marp** Theme

シンプルで美しいスライドを、Markdownだけで

---

<!-- _class: section -->
<!-- _paginate: false -->

## このテーマについて

---

### **5つ**のレイアウトだけ

このテーマはミニマルです。

- **title** — 表紙。H1とサブテキスト
- **section** — 中扉。章の区切りに
- **基本** — クラス指定なし。H3で始める
- **content-right** — 左テキスト、右に画像
- **image** — 画像のみを大きく見せる

これだけで、ほとんどのプレゼンは作れます。

---

<!-- _class: section -->
<!-- _paginate: false -->

## 書き方

---

### **基本**の構文

クラス指定は `<!-- _class: クラス名 -->` で行います。

- 見出しの一部を `**強調**` するとプライマリカラーに
- 引用は `>` で。左にアクセントカラーのラインが入る

> シンプルなルールだけ覚えれば、あとは書くだけ。

---

### **ページ番号**の制御

フロントマターで `paginate: true` を指定すると全スライドに番号が入ります。

> marp: true
> theme: custom
> paginate: true

特定のスライドで非表示にしたい場合は `<!-- _paginate: false -->` を追加。表紙や中扉で使います。

---

<!-- _class: content-right -->

### **画像**の配置

`content-right` で左右分割レイアウトに。

画像はMarkdown記法で最後に記述します。

`![](url)`

placehold.jpを使えば任意サイズのダミー画像を配置できます。

`https://placehold.jp/幅x高さ.png`

![](https://placehold.jp/400x300.png)

---

<!-- _class: image -->

### **image**クラスで画像を主役に

![](https://placehold.jp/800x400.png)

---

<!-- _class: section -->
<!-- _paginate: false -->

## カラーパレット

---

### 使える**色**

- **Primary** `#799BF9` — 見出しの強調、リンク
- **Accent** `#FFA775` — 引用線、セクション下線
- **Danger** `#FF5151` — 警告や注意喚起に（CSS変数として定義済み）

色は最小限に。多すぎると散漫になります。

---

<!-- _class: title -->
<!-- _paginate: false -->

# Write **Less**, Show More

余計なものを削ぎ落とし、伝えたいことだけを
