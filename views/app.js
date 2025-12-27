"use strict";

const express = require("express");
const path = require("path");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

/* ========= データ ========= */

// 洋画
let movies2 = [
  { id:1, title:"The Dark Knight", director:"Christopher Nolan", year:2008, country:"USA", genre:"Action" },
  { id:2, title:"Inception", director:"Christopher Nolan", year:2010, country:"USA", genre:"SF" },
  { id:3, title:"Titanic", director:"James Cameron", year:1997, country:"USA", genre:"Drama" },
  { id:4, title:"Forrest Gump", director:"Robert Zemeckis", year:1994, country:"USA", genre:"Drama" },
  { id:5, title:"Interstellar", director:"Christopher Nolan", year:2014, country:"USA", genre:"SF" }
];

// ラ・リーガ（全20）
let laliga2 = [
  {id:1,name:"Real Madrid",city:"Madrid",stadium:"Bernabéu",titles:35},
  {id:2,name:"FC Barcelona",city:"Barcelona",stadium:"Camp Nou",titles:27},
  {id:3,name:"Atlético Madrid",city:"Madrid",stadium:"Metropolitano",titles:11},
  {id:4,name:"Athletic Bilbao",city:"Bilbao",stadium:"San Mamés",titles:8},
  {id:5,name:"Real Sociedad",city:"San Sebastián",stadium:"Reale Arena",titles:2},
  {id:6,name:"Real Betis",city:"Seville",stadium:"Villamarín",titles:1},
  {id:7,name:"Sevilla FC",city:"Seville",stadium:"Sánchez-Pizjuán",titles:1},
  {id:8,name:"Villarreal",city:"Villarreal",stadium:"La Cerámica",titles:0},
  {id:9,name:"Valencia",city:"Valencia",stadium:"Mestalla",titles:6},
  {id:10,name:"Getafe",city:"Getafe",stadium:"Coliseum",titles:0},
  {id:11,name:"Osasuna",city:"Pamplona",stadium:"El Sadar",titles:0},
  {id:12,name:"Rayo Vallecano",city:"Madrid",stadium:"Vallecas",titles:0},
  {id:13,name:"Celta Vigo",city:"Vigo",stadium:"Balaídos",titles:0},
  {id:14,name:"Mallorca",city:"Palma",stadium:"Son Moix",titles:0},
  {id:15,name:"Las Palmas",city:"Las Palmas",stadium:"Gran Canaria",titles:0},
  {id:16,name:"Girona",city:"Girona",stadium:"Montilivi",titles:0},
  {id:17,name:"Alavés",city:"Vitoria",stadium:"Mendizorroza",titles:0},
  {id:18,name:"Granada",city:"Granada",stadium:"Los Cármenes",titles:0},
  {id:19,name:"Cádiz",city:"Cádiz",stadium:"Mirandilla",titles:0},
  {id:20,name:"Almería",city:"Almería",stadium:"Power Horse",titles:0}
];

// ディズニー
let disney2 = [
  {id:1,name:"Tokyo Disney Resort",country:"Japan",opened:1983,parks:2},
  {id:2,name:"Disneyland Resort",country:"USA",opened:1955,parks:2},
  {id:3,name:"Walt Disney World",country:"USA",opened:1971,parks:4},
  {id:4,name:"Disneyland Paris",country:"France",opened:1992,parks:2},
  {id:5,name:"Hong Kong Disneyland",country:"China",opened:2005,parks:1},
  {id:6,name:"Shanghai Disney Resort",country:"China",opened:2016,parks:1}
];

/* ========= 共通 ========= */
const valid = (arr,i)=>Number.isInteger(i)&&i>=0&&i<arr.length;
const nextId = arr => arr.length ? arr[arr.length-1].id+1 : 1;

/* ========= Top ========= */
app.get("/",(req,res)=>res.render("top"));

/* ========= Movies ========= */
app.get("/movies2",(req,res)=>res.render("movies2",{data:movies2}));
app.get("/movies2/create",(req,res)=>res.render("movies2_create"));
app.post("/movies2",(req,res)=>{
  movies2.push({id:nextId(movies2),...req.body,year:Number(req.body.year)});
  res.redirect("/movies2");
});
app.get("/movies2/:n",(req,res)=>{
  const n=Number(req.params.n); if(!valid(movies2,n))return res.sendStatus(404);
  res.render("movies2_detail",{id:n,data:movies2[n]});
});
app.get("/movies2/edit/:n",(req,res)=>{
  const n=Number(req.params.n); if(!valid(movies2,n))return res.sendStatus(404);
  res.render("movies2_edit",{id:n,data:movies2[n]});
});
app.post("/movies2/update/:n",(req,res)=>{
  const n=Number(req.params.n); if(!valid(movies2,n))return res.sendStatus(404);
  movies2[n]={...movies2[n],...req.body,year:Number(req.body.year)};
  res.redirect("/movies2");
});
app.get("/movies2/delete/:n",(req,res)=>{
  const n=Number(req.params.n); if(!valid(movies2,n))return res.sendStatus(404);
  movies2.splice(n,1); res.redirect("/movies2");
});

/* ========= LaLiga ========= */
app.get("/laliga2",(req,res)=>res.render("laliga2",{data:laliga2}));
app.get("/laliga2/create",(req,res)=>res.render("laliga2_create"));
app.post("/laliga2",(req,res)=>{
  laliga2.push({id:nextId(laliga2),...req.body,titles:Number(req.body.titles)});
  res.redirect("/laliga2");
});
app.get("/laliga2/:n",(req,res)=>{
  const n=Number(req.params.n); if(!valid(laliga2,n))return res.sendStatus(404);
  res.render("laliga2_detail",{id:n,data:laliga2[n]});
});
app.get("/laliga2/edit/:n",(req,res)=>{
  const n=Number(req.params.n); if(!valid(laliga2,n))return res.sendStatus(404);
  res.render("laliga2_edit",{id:n,data:laliga2[n]});
});
app.post("/laliga2/update/:n",(req,res)=>{
  const n=Number(req.params.n); if(!valid(laliga2,n))return res.sendStatus(404);
  laliga2[n]={...laliga2[n],...req.body,titles:Number(req.body.titles)};
  res.redirect("/laliga2");
});
app.get("/laliga2/delete/:n",(req,res)=>{
  const n=Number(req.params.n); if(!valid(laliga2,n))return res.sendStatus(404);
  laliga2.splice(n,1); res.redirect("/laliga2");
});

/* ========= Disney ========= */
app.get("/disney2",(req,res)=>res.render("disney2",{data:disney2}));
app.get("/disney2/create",(req,res)=>res.render("disney2_create"));
app.post("/disney2",(req,res)=>{
  disney2.push({id:nextId(disney2),...req.body,opened:Number(req.body.opened),parks:Number(req.body.parks)});
  res.redirect("/disney2");
});
app.get("/disney2/:n",(req,res)=>{
  const n=Number(req.params.n); if(!valid(disney2,n))return res.sendStatus(404);
  res.render("disney2_detail",{id:n,data:disney2[n]});
});
app.get("/disney2/edit/:n",(req,res)=>{
  const n=Number(req.params.n); if(!valid(disney2,n))return res.sendStatus(404);
  res.render("disney2_edit",{id:n,data:disney2[n]});
});
app.post("/disney2/update/:n",(req,res)=>{
  const n=Number(req.params.n); if(!valid(disney2,n))return res.sendStatus(404);
  disney2[n]={...disney2[n],...req.body,opened:Number(req.body.opened),parks:Number(req.body.parks)};
  res.redirect("/disney2");
});
app.get("/disney2/delete/:n",(req,res)=>{
  const n=Number(req.params.n); if(!valid(disney2,n))return res.sendStatus(404);
  disney2.splice(n,1); res.redirect("/disney2");
});

app.listen(8080,()=>console.log("http://localhost:8080"));
