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

let station2 = [
  { id:1, code:"JE01", name:"東京駅", change:"総武本線，中央線，etc", passengers:403831, distance:0 },
  { id:2, code:"JE02", name:"八丁堀駅", change:"日比谷線", passengers:31071, distance:1.2 },
  { id:3, code:"JE05", name:"新木場駅", change:"有楽町線，りんかい線", passengers:67206, distance:7.4 },
  { id:4, code:"JE07", name:"舞浜駅", change:"舞浜リゾートライン", passengers:76156,distance:12.7 },
  { id:5, code:"JE12", name:"新習志野駅", change:"", passengers:11655, distance:28.3 },
  { id:6, code:"JE17", name:"千葉みなと駅", change:"千葉都市モノレール", passengers:16602, distance:39.0 },
  { id:7, code:"JE18", name:"蘇我駅", change:"内房線，外房線", passengers:31328, distance:43.0 },
];

app.get("/keiyo2", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  res.render('keiyo2', {data: station2} );
});

app.get("/keiyo2/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = station2[ number ];
  res.render('keiyo2_detail', {data: detail} );
});

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