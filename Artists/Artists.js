import React, { useReducer } from "react";

export const artistList = [
  "",
  "aespa",
  "Apink",
  "ASTRO",
  "ATEEZ",
  "BLACKPINK",
  "BTS",
  "Cherry Bullet",
  "STAYC",
  "Twice",
  "EXO",
  "NCT 127",
  "NMIXX",
  "Stray Kids",
  "ITZY",
  "TXT",
  "Kep1er",
  "IVE",
  "VIVIZ",
].sort(function (a, b) {
  return a.toLowerCase().localeCompare(b.toLowerCase());
});

// CREATE REDUCER
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_ARTIST":
      return { ...state, artist: action.payload };
    default:
      return state;
  }
};

export const artistList2 = {
  aespa: {
    debut: "2020.11.17",
    members: ["Winter", "Karina", "Giselle", "Ning Ning"],
    leader: "Karina",
    label: "SM Entertainment",
    fandom: "MY (마이)",
    albums: [
      "Black Mamba",
      "forever",
      "Next Level",
      "Savage",
      "Dreams Come True",
    ],
    twitterID: "1277453652924366848",
    twitterIDurl: "aespa_official",
  },

  Apink: {
    debut: "2011.04.19",
    members: [
      "Park Cho Rong,",
      "Yoon Bo mi,",
      "Jeong Eun Ji,",
      "Kim Nam ju,",
      "Oh Ha Young,",
    ],
    leader: "Park Cho Rong",
    label: "IST Entertainment",
    fandom: "PANDA",
    albums: ["Horn"],
    twitterID: "631007548",
    twitterIDurl: "Apink_2011",
  },

  ASTRO: {
    debut: "2016.02.23",
    members: [
      "MJ",
      "Jin Jin",
      "Cha Eun Woo",
      "Moon Bin",
      "ROCKY",
      "Yoon Sanha",
    ],
    leader: "Jin Jin",
    label: "fantagio",
    fandom: "AROHA",
    albums: [],
    twitterID: "3314485566",
    twitterIDurl: "offclAstro",
  },
  ATEEZ: {
    debut: "2018.10.24",
    members: [
      "Seong Wha",
      "Hong Joong",
      "Yoon Ho",
      "Yeosang",
      "San",
      "Min Gi",
      "Woo Young",
      "Jong Ho",
    ],
    leader: "Hong Joong",
    label: "KQ Entertainment",
    fandom: "ATINY",
    albums: [],
    twitterID: "923415570522914819",
    twitterIDurl: "ATEEZofficial",
  },

  BLACKPINK: {
    debut: "2016.08.08",
    members: ["JISOO", "JENNIE", "ROSÉ", "LISA"],
    leader: "-",
    label: "YG Entertainment",
    fandom: "BLINK",
    albums: [],
    twitterID: "1273850774380883975",
    twitterIDurl: "BLACKPINK",
  },

  BTS: {
    debut: "2013.06.13",
    members: ["Jin", "Suga", "J Hope", "RM", "Jimin", "V", "Jungkook"],
    leader: "RM",
    label: "HYBE Labels",
    fandom: "ARMY",
    albums: [],
    twitterID: "1409798257",
    twitterIDurl: "bts_bighit",
  },

  "Cherry Bullet": {
    debut: "2019.01.21",
    members: ["May", "Yuju", "Jiwon", "Haeyoon", "Remi", "Bora", "Chaerin"],
    leader: "",
    label: "FNC Entertainment",
    fandom: "Bullet",
    albums: [],
    twitterID: "",
    twitterIDurl: "",
  },

  EXO: {
    debut: "2012.04.08",
    members: [
      "Xiumin",
      "Suho",
      "Lay",
      "Baekhyun",
      "Chen",
      "Chanyeol",
      "D.O.",
      "Kai",
      "Sehun",
    ],
    leader: "Suho",
    label: "SM Entertainment",
    fandom: "EXO-L",
    albums: [],
    twitterID: "873115441303924736",
    twitterIDurl: "weareoneEXO",
  },

  ITZY: {
    debut: "2019.02.12",
    members: ["Yeji", "Lia", "Ryujin", "Chaeryoung", "Yuna"],
    leader: "Yeji",
    label: "JYP Entertainment",
    fandom: "midzy",
    albums: [],
    twitterID: "1062578718214770688",
    twitterIDurl: "ITZYofficial",
  },

  IVE: {
    debut: "2021.12.01",
    members: ["Yujin", "Gaeul", "Rei", "Wonyoung", "Liz", "Leeseo"],
    leader: "Yujin",
    label: "STARSHIP Entertainment",
    fandom: "dive",
    albums: [],
    twitterIDurl: "IVEstarship",
    twitterID: "1402182579265048598",
  },

  Kep1er: {
    debut: "2021.10.22",
    members: [
      "Yujin",
      "Xiaoting",
      "Mashiro",
      "Chaehyun",
      "Dayeon",
      "Hikaru",
      "Huening Bahiyyih",
      "Youngeun",
      "Yeseo",
    ],
    leader: "Yujin",
    label: "WAKE ONE - Swing Entertainment",
    fandom: "Keplian",
    albums: [],
    twitterIDurl: "official_kep1er",
    twitterID: "1448627067856179203",
  },

  "NCT 127": {
    debut: "2016.07.07",
    members: [
      "Taeil",
      "Johnny",
      "Taeyong",
      "Yuta",
      "Doyoung",
      "Jaehyun",
      "Winwin",
      "Jeongwoo",
      "Mark",
      "Haechan",
    ],
    leader: "Taeyong",
    label: "SM Entertainment",
    fandom: "NCTzen",
    albums: [],
    twitterIDurl: "NCTsmtown_127",
    twitterID: "869875390465982465",
  },

  NMIXX: {
    debut: "2022.02.22",
    members: ["Lily", "Haewon", "Sullyoon", "Jinni", "Bae", "Jiwoo", "Kyujin"],
    leader: "Haewon",
    label: "JYP Entertainment",
    fandom: "NSWER",
    albums: [],
    twitterIDurl: "NMIXX_official",
    twitterID: "1392302226782052355",
  },

  STAYC: {
    debut: "2020.11.12",
    members: ["Sumin", "Sieun", "Isa", "Seeun", "Yoon", "J"],
    leader: "Sumin",
    label: "Highup Entertainment",
    fandom: "SWITH",
    albums: [],
    twitterIDurl: "STAYC_official",
    twitterID: "1302813483902230528",
  },

  "Stray Kids": {
    debut: "2018.03.25",
    members: [
      "Bang Chan",
      "Leeknow",
      "Changbin",
      "Hyunjin",
      "Han",
      "Felix",
      "Seungmin",
      "I.N",
    ],
    leader: "Bang Chan",
    label: "JYP Entertainment",
    fandom: "STAY",
    albums: [],
    twitterIDurl: "Stray_Kids",
    twitterID: "859297966581891072",
  },

  Twice: {
    debut: "2015.10.20",
    members: [
      "Nayeon",
      "Momo",
      "Jihyo",
      "Sana",
      "Jeongyeon",
      "Chaeyoung",
      "Tzuyu",
      "Dahyun",
      "Mina",
    ],
    leader: "Nayeon",
    label: "JYP Entertainment",
    fandom: "Once",
    albums: [],
    twitterIDurl: "JYPETWICE",
    twitterID: "3129056526",
  },

  TXT: {
    debut: "2019.03.04",
    members: ["Yeonjun", "Subin", "Beomgyu", "Taehyun", "HUENINGKAI"],
    leader: "Subin",
    label: "HYBE Labels",
    fandom: "MOA",
    albums: [],
    twitterIDurl: "TXT_bighit",
    twitterID: "1083198663424237569",
  },

  VIVIZ: {
    debut: "2022.02.09",
    members: ["Umji", "Eunha", "Sinbi"],
    leader: "Umji",
    label: "Swing Entertainment",
    fandom: "Na.V",
    albums: [],
    twitterIDurl: "VIVIZ_official",
    twitterID: "1441319485638463495",
  },

  "": {
    debut: "",
    members: [],
    leader: "",
    label: "",
    fandom: "",
    albums: [],
    twitterIDurl: "",
    twitterID: "",
  },

  "": {
    debut: "",
    members: [],
    leader: "",
    label: "",
    fandom: "",
    albums: [],
    twitterIDurl: "",
    twitterID: "",
  },
};
