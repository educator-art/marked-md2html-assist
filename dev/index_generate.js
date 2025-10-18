/* 
index_generate.js
index.htmlを作成する
*/

const fs = require("fs");
const marked = require("marked");

// テンプレートファイルの読み込み
const template = fs.readFileSync("template.html", "utf8");

// Markdownファイルのパス
const markdownFile = "./index.md";// ① HTMLに出力するMarkdownファイルを指定する
const markdownContent = fs.readFileSync(markdownFile, 'utf8');

// 現在の日時を取得
const now = new Date();
// 日本の時間表記でフォーマットする
const options = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  timeZone: 'Asia/Tokyo'
};
// 日本語のロケールを使用してフォーマット
const formattedDate = new Intl.DateTimeFormat('ja-JP', options).format(now);
const updatedString = formattedDate + " update";

// 記事の情報
const article = {
  title: "●●日記", // ② 記事のタイトルをかく
  description: "日々の徒然なるかな",// ③ 記事の説明をかく
  content: markdownContent, // markdownの内容
  update: updatedString // 更新日付
};

// MarkdownをHTMLに変換
const htmlContent = marked.parse(article.content);
console.log(htmlContent)

// テンプレートに値を挿入して変換結果を生成
const result = template
  .replaceAll("{{title}}", article.title)
  .replaceAll("{{description}}", article.description)
  .replaceAll("{{content}}", htmlContent)
  .replaceAll("{{update}}", updatedString);

// 変換結果をファイルに書き込む
fs.writeFileSync("../pub/index.html", result);
console.log('HTMLファイルが生成されました。');