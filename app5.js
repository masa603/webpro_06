// webpro_06/app5.js

const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use('/public', express.static(__dirname + '/public'));

// 1. 初期データの定義 [cite: 126]
let station = [
    { id: 1, code: "JE01", name: "東京駅" },
    { id: 2, code: "JE07", name: "舞浜駅" },
    { id: 3, code: "JE12", name: "新習志野駅" },
    { id: 4, code: "JE13", name: "幕張豊砂駅" },
    { id: 5, code: "JE14", name: "海浜幕張駅" },
    { id: 6, code: "JE05", name: "新浦安駅" }
];

// 2. 駅一覧を表示するルーティング [cite: 152]
app.get("/keiyo", (req, res) => {
    res.render('db1', { data: station }); // db1.ejsを表示 [cite: 154]
});

// 3. 駅を追加するルーティング [cite: 325]
app.get("/keiyo_add", (req, res) => {
    // フォームから送信された値を取得 [cite: 327]
    let id = req.query.id;
    let code = req.query.code;
    let name = req.query.name;

    // 新しいデータを作成して配列に追加 [cite: 330, 331]
    let newdata = { id: id, code: code, name: name };
    station.push(newdata);

    // 一覧画面を再表示（リダイレクトではなくrenderを使う場合の例） [cite: 332]
    res.render('db1', { data: station });
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));