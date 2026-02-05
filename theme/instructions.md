# Custom Marp Theme Reference

This document integrates the design specifications, layout classes, and usage patterns for the Custom Marp theme. It is intended as a high-density reference for generating compatible slides.

## 1. Global Settings & Directives
Frontmatter configuration for enabling the theme.

```yaml
---
marp: true
theme: custom      # Use custom theme
paginate: true      # Enable page numbers
title: Slide Title
description: Description
---
```

## 2. Design System

### Colors
**Primary**
- Brand Blue: `#2C67E5` (Links, Emphasis, `text-blue`)
- Brand Red:  `#DF3756` (Accents, `text-red`)

**Grayscale**
- Dark: `#262626` (Paragraphs)
- Medium: `#434343` (Default text, Headings)
- Light: `#595959` (Auxiliary)
- Borders: `#646464`, `#999999`
- Backgrounds: `#FFFFFF` (Standard), `#F3F3F3` (Title/Section), `#e1e1e1` (Code)

### Typography
**Font Sizes**
- `h1` (Title): 40px
- `h2` (Section): 36px
- `h3` (Sub-section): 32px
- `h4`: 26px, `h5`: 22px, `h6`: 20px
- Body: 26px
- Small/Caption: 20px - 22px
- Annotation/Table: 16px - 18px

**Line Height**
- Headings: 1.15 - 1.21
- Body: 1.5

### Slide Dimensions
- Size: 1920x1080px (16:9)
- Padding: 92px
- Header Height: 80px

## 3. Layout Classes (`<!-- _class: name -->`)

Apply these classes to the current slide using the directive.

| Class Name | Description | Visualization/Notes |
|------------|-------------|---------------------|
| `title` | Presentation title slide. Center-aligned, accent background. | Displays H1 (Title), metadata strongly. |
| `section` | Chapter/Section divider. Center-aligned, accent background. | Use for major topic changes. |
| `image` | Full slide content is an image. | Centers content. often used with `![w:800](url)`. |
| `image-shadow` | Adds shadow to the image on the slide. | Combine with `image`. |
| `no-header` | Hides the top header logo/bar. | Useful for full-screen impact. |

### Content & Image Layouts
These classes structure text alongside images.

| Class Name | Layout Behavior | Modifiers (Width) |
|------------|-----------------|-------------------|
| `content-image` | Vertical stack: Text then Image (or vice versa). | Default widths. |
| `content-image-right` | **Left**: Text, **Right**: Image. | Default split: 50/50. |
| `content-image-left` | **Left**: Image, **Right**: Text. | Default split: 50/50. |

**Width Modifiers for `content-image-*`**
Adjust the text column width (image takes remaining space). Append to class list.
- `content-30`: Text 30% / Image 70%
- `content-40`: Text 40% / Image 60%
- `content-60`: Text 60% / Image 40%
- `content-70`: Text 70% / Image 30%
- `content-80`: Text 80% / Image 20%

*Example:*
```markdown
<!-- _class: content-image-left content-60 -->
# Heading
Text takes 60% width on the right. Image takes 40% on the left.
![w:400](img.png)
```

### Column Layout
Create multi-column layouts using HTML syntax within the `column-layout` class.

```markdown
<!-- _class: column-layout -->
<div class="column">
  ## Left
  Content...
</div>
<div class="column">
  ## Right
  Content...
</div>
```

## 4. Utility Classes

Combine these with other classes to adjust styling.

### Text Alignment
- `text-center`: Center-aligns paragraph text (keeps headings default).
- `all-text-center`: Center-aligns **everything** (Headings + Body).
- `align-center`: Vertically aligns content to the middle of the slide.
- `content-center`: Centers content block within the slide.
- **Heading specific**: `h1-text-center` ... `h6-text-center`.

### Text Colors
- `text-blue`: Changes paragraph text to Brand Blue.
- `text-red`: Changes paragraph text to Brand Red.
- `all-text-blue`: Change **all** text to Blue.
- `all-text-red`: Change **all** text to Red.
- **Heading specific**: `h1-text-red`, `h2-text-red`...

### Sizing & Pagination
- `small-text`: Reduces all font sizes by ~20%. Good for dense code or tables.
- `_paginate: false`: Hide page number for this slide.
- `_paginate: skip`: Skip this slide in page counting.

## 5. Syntax & Components

### Images
Standard Markdown with Marp width/height extensions.
- `![w:400px](img.png)`: Fixed width.
- `![w:50%](img.png)`: Percentage of parent container.
- `![h:300px](img.png)`: Fixed height.

### Code Blocks
Standard fenced blocks. Font size adjusts automatically to fit.
````markdown
```python
print("Hello")
```
````

### Tables
Standard Markdown tables.
```markdown
| Header | Header |
|--------|--------|
| Cell   | Cell   |
```

### Math (KaTeX)
```latex
$$
\sum_{i=1}^{n} x_i = x_1
$$
```

### Blue Heading Accents
Wrap text in `**` within a heading to color it Brand Blue suitable for emphasis.
```markdown
# This is normal, **this is Blue**
```

### Details/Accordion
```html
<details>
<summary>Open Details</summary>
Hidden content.
</details>
```

## 6. Common Patterns (Cheatsheet)

**Standard Slide**
```markdown
---
# Page Title
- Bullet point 1
- Bullet point 2
```

**Two Column Split (Image Right)**
```markdown
---
<!-- _class: content-image-right content-60 -->
# Feature Overview
Description of the feature goes here.
- Detail A
- Detail B

![w:500px](screenshot.png)
```

**Title Slide**
```markdown
---
<!-- _class: title -->
<!-- _paginate: false -->
# Product Name
Presenter Name
Date
```

## Example Slides

```markdown
---
marp: true
theme: custom
paginate: true
title: サンプルスライド
description: サンプルスライドです。
---

<!-- 
利用用途に合わせてスライドをコピーする形で利用するといいと思います
特にスライド上部にある"_class: "は大切な要素なので間違えないようにしてください
 -->

<!-- _class: title　-->
<!-- _paginate: false -->

![logo w:400px](https://placehold.jp/400x400.png)

# このページはタイトルに適しています

20XX/XX/XX ここには日付や執筆者の名前など
必要な情報を入力して下さい

---

<!-- _class: section -->
<!-- _paginate: false -->

## レイアウト：中扉・セクション
テキストは左寄せの中央に配置、背景色はグレーになります

---

# 基本のレイアウト

基本のレイアウトを使用する際は必ずスライドタイトルに h1 を利用してください

# 最初のh1以外でもh1を使うことができます

スライドタイトルの下に一本の線が引かれるのでタイトルと内容がハッキリと区別できます

---

# 通常のマークダウン記法

通常のマークダウン記法はそのまま利用することができます。

# 見出し

**太字**, *斜体*, ***太字斜体***, ~~取り消し線~~, `インライン`, [リンク](https://example.com)


- リスト
1. 番号付きリスト


> 引用


```ts
// コードブロック
console.log("Hello, World!");
```

| テーブル | 列2 | 列3 |
| -------- | --- | --- |
| A        | B   | C   |

---
# 通常のMarp記法(よく使うものを抜粋)

## 見出しの一部を**青色のアクセントカラー**にする

```md
## 見出しの一部を**青色のアクセントカラー**にする
見出し内で**に囲まれた部分は青色のアクセントカラーになります
```

画像の横幅・縦幅を変える

![w:100](https://placehold.jp/150x150.png)

```md
![w:100](https://placehold.jp/150x150.png)
w:100 幅100pxで表示
h:100 縦100pxで表示
```

---

<!-- _class: no-header -->

# ヘッダーなしレイアウト（no-header）

このスライドではヘッダー部分が非表示になります
フルスクリーンでコンテンツを表示したい場合に便利です

---

<!-- _class: image -->

# タイトル・図のみ

![w:800px](https://placehold.jp/300x200.png)

---

<!-- _class: image image-shadow -->

# タイトル・図のみ(影付き)

![w:800px](https://placehold.jp/ffffff/8c8c8c/300x200.png)

---

<!-- _class: image -->

# タイトル・図のみ(複数)

![w:500px](https://placehold.jp/300x200.png)
![w:500px](https://placehold.jp/300x200.png)

---


<!-- _class: content-image -->

# レイアウト：タイトル・図・テキスト

![w:700px](https://placehold.jp/300x200.png)

ここにテキストを入れてください。

---

<!-- _class: content-image -->

# レイアウト：タイトル・図・テキスト(複数)

![w:500px](https://placehold.jp/300x200.png)
![w:500px](https://placehold.jp/300x200.png)

ここにテキストを入れてください

---


<!-- _class: content-image-right -->
<!-- 幅を変えたい場合の設定「content-image-right content-60」など -->


# 文章と図を横並びに表現(図が右側)

![w:500px](https://placehold.jp/300x200.png)
- content-image-rightクラスは、右側に画像を配置するレイアウトを提供
- デフォルトでは右側50%の幅になります
- `content-xx`で左側のテキスト領域の幅を調整できます
  - content-30: テキスト領域30%
  - content-40: テキスト領域40%
  - content-60: テキスト領域60%
  - content-70: テキスト領域70%
  - content-80: テキスト領域80%

---

<!-- _class: content-image-left content-60 -->
<!-- 幅を変えたい場合の設定「content-image-left content-60」など -->

# 文章と図を横並びに表現(図が左側)

![w:400px](https://placehold.jp/300x200.png)
![w:400px](https://placehold.jp/300x200.png)

- content-image-leftクラスは、左側に画像を配置するレイアウトを提供
- デフォルトでは左側50%の幅になります
- `content-xx`で左側のテキスト領域の幅を調整できます
  - content-30: テキスト領域30%
  - content-40: テキスト領域40%
  - content-60: テキスト領域60%
  - content-70: テキスト領域70%
  - content-80: テキスト領域80%


---

<!-- _class: column-layout -->

# 横並びレイアウト（column-layout）

<div class="column">

## 左カラム
- ポイント1
- ポイント2  
- ポイント3
</div>

<div class="column">

## 中央カラム
1. 手順1
2. 手順2
3. 手順3
</div>

<div class="column">

## 右カラム
1. 方法1
2. 方法2
3. 方法3
</div>

---

<!-- _class: all-text-center -->

<!-- ↑ここをtext-center, h1-text-center, h2-text-center, h3-text-center, h4-text-center, h5-text-center, h6-text-centerに変更すると、それぞれの見出しレベルごとに中央揃えになります -->

<!-- all-text-centerに変更すると、スライド内のすべてのテキストが中央揃えになります -->

# テキストの中央揃え（text-center）
<!-- タイトルは影響を受けません -->

# 見出しレベル1のテキスト h1-text-center
## 見出しレベル2のテキスト h2-text-center
### 見出しレベル3のテキスト h3-text-center
#### 見出しレベル4のテキスト h4-text-center
##### 見出しレベル5のテキスト h5-text-center
###### 見出しレベル6のテキスト h6-text-center
通常のテキスト text-center

---

<!-- _class: align-center -->

# スライド全体のテキストの縦方向中央揃え（align-center）
<!-- タイトルは影響を受けません -->

# 見出しレベル1のテキスト
## 見出しレベル2のテキスト
### 見出しレベル3のテキスト

---

<!-- _class: all-text-red -->

<!-- ↑ここをall-text-red, h1-text-red, h2-text-red, h3-text-red, h4-text-red, h5-text-red, h6-text-red, text-redに変更すると、それぞれの見出しレベルごとに赤色になります -->

<!-- all-text-redに変更すると、スライド内のすべてのテキストが赤色になります -->

# テキストの色変更（red）
<!-- タイトルは影響を受けません -->

#  見出しレベル1のテキスト h1-text-red
## 見出しレベル2のテキスト h2-text-red
### 見出しレベル3のテキスト h3-text-red
#### 見出しレベル4のテキスト h4-text-red
##### 見出しレベル5のテキスト h5-text-red
###### 見出しレベル6のテキスト h6-text-red
通常のテキスト text-red


---

<!-- _class: text-blue -->

# テキストの色変更（blue）

## 見出しは通常色のまま

text-blueクラスを使用すると、段落テキストのみが青色になります。見出しは元の色を保持します。

---

# コードブロック

```ts
type User = {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
};

const users: User[] = [
  { id: 1, name: "山田太郎", email: "taro@example.com", isActive: true },
  { id: 2, name: "鈴木花子", email: "hanako@example.com", isActive: false },
  { id: 3, name: "佐藤次郎", email: "jiro@example.com", isActive: true },
];

function printActiveUsers(userList: User[]) {
  console.log("アクティブなユーザー一覧:");
  userList
    .filter(user => user.isActive)
    .forEach(user => {
      console.log(`ID: ${user.id}, 名前: ${user.name}, メール: ${user.email}`);
    });
}

function activateUser(userList: User[], id: number) {
  const user = userList.find(u => u.id === id);
  if (user) {
    user.isActive = true;
    console.log(`${user.name} をアクティブにしました。`);
  } else {
    console.log("該当ユーザーが見つかりません。");
  }
}

printActiveUsers(users);
activateUser(users, 2);
printActiveUsers(users);
```

コードの大きさに合わせて自動でコードブロック内のテキストが小さくなります

---
# その他

## 数式の表示
$$
\sum_{i=1}^{n} x_i = x_1 + x_2 + \cdots + x_n
$$


## 折りたたみ
<details>
<summary>詳細を開く</summary>
詳細内容をここに記載します
</details>


## カスタムCSSの適用
<style>
.highlight-box {
    background-color: #e3f2fd;
    border-left: 4px solid #2196f3;
    padding: 16px;
    margin: 16px 0;
}
</style>

<div class="highlight-box">
このスライド専用のカスタムスタイルを適用できます
</div>

---

<!-- _paginate: false -->

# ページネーション制御

このスライドはページ番号がスキップされます（`_paginate: skip`）。
このスライドはページ番号が表示されなくなります（`_paginate: false`）。

目次や表紙などでページ番号を表示したくない場合に使用します

---

<!-- _class: small-text -->

# 文字を小さくする

`small-text` クラスを使用すると、スライド全体のフォントサイズが20%程度縮小されます。

情報量が多いスライドや、通常のサイズでは収まりきらない内容を表示する際に便利です。

---

<!-- _class: all-text-center align-center -->

![w:450px](https://placehold.jp/450x450.png)
```
