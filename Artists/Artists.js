import React, { useReducer } from "react";

export const artistList = [
  '',
  'aespa',
  'Apink',
  'ASTRO',
  'ATEEZ',
  'BLACKPINK',
  'BTS',
  'Cherry Bullet',
  'STAYC',
  'TWICE',
  'EXO',
  'JENNIE',
  'NCT 127',
  'NMIXX',
  'Stray Kids',
  'ITZY',
  'TXT',
  'Kep1er',
  'IVE',
  'VIVIZ',
]
  .sort(function (a, b) {
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

  'aespa': {
    debut: '2020.11.17',
    members: [
      'Winter',
      'Karina',
      'Giselle',
      'Ning Ning'
    ],
    leader: 'Karina',
    label: 'SM Entertainment',
    fandom: 'MY (마이)',
    albums: [
      'Black Mamba',
      'forever',
      'Next Level',
      'Savage',
      'Dreams Come True',
    ],
    twitterID: '1277453652924366848',
    twitterIDurl: 'aespa_official',
  },

  'Apink': {
    debut: '2011.04.19',
    members: [
      'Park Cho Rong,',
      'Yoon Bo mi,',
      'Jeong Eun Ji,',
      'Kim Nam ju,',
      'Oh Ha Young,'
    ],
    leader: 'Park Cho Rong',
    label: 'IST Entertainment',
    fandom: 'PANDA',
    albums: [
      'Horn'
    ],
    twitterID: '631007548',
    twitterIDurl: 'Apink_2011',
  },

  'ASTRO': {
    debut: '2016.02.23',
    members: [
      'MJ',
      'Jin Jin',
      'Cha Eun Woo',
      'Moon Bin',
      'ROCKY',
      'Yoon Sanha'
    ],
    leader: 'Jin Jin',
    label: 'fantagio',
    fandom: 'AROHA',
    albums: [

    ],
    twitterID: '3314485566',
    twitterIDurl: 'offclAstro',
  },
  'ATEEZ': {
    debut: '2018.10.24',
    members: [
      'Seong Wha',
      'Hong Joong',
      'Yoon Ho',
      'Yeosang',
      'San',
      'Min Gi',
      'Woo Young',
      'Jong Ho'
    ],
    leader: 'Hong Joong',
    label: 'KQ Entertainment',
    fandom: 'ATINY',
    albums: [

    ],
    twitterID: '923415570522914819',
    twitterIDurl: 'ATEEZofficial',
  },


  'BLACKPINK': {
    debut: '2016.08.08',
    members: [
      'JISOO',
      'JENNIE',
      'ROSÉ',
      'LISA'
    ],
    leader: '-',
    label: 'YG Entertainment',
    fandom: 'BLINK',
    albums: [

    ],
    twitterID: '1273850774380883975',
    twitterIDurl: 'BLACKPINK',
  },


  'BTS': {
    debut: '2013.06.13',
    members: [
      'Jin',
      'Suga',
      'J Hope',
      'RM',
      'Jimin',
      'V',
      'Jungkook',
    ],
    leader: 'RM',
    label: 'HYBE Labels',
    fandom: 'ARMY',
    albums: [

    ],
    twitterID: '1409798257',
    twitterIDurl: 'bts_bighit',
  },

  'Cherry Bullet': {
    debut: '2019.01.21',
    members: [
      'May',
      'Yuju',
      'Jiwon',
      'Haeyoon',
      'Remi',
      'Bora',
      'Chaerin'
    ],
    leader: '',
    label: 'FNC Entertainment',
    fandom: 'Bullet',
    albums: [

    ],
    twitterID: '',
    twitterIDurl: '',
  },

  'EXO': {
    debut: '2012.04.08',
    members: [
      'Xiumin',
      'Suho',
      'Lay',
      'Baekhyun',
      'Chen',
      'Chanyeol',
      'D.O.',
      'Kai',
      'Sehun',
    ],
    leader: 'Suho',
    label: 'SM Entertainment',
    fandom: 'EXO-L',
    albums: [

    ],
    twitterID: '873115441303924736',
    twitterIDurl: 'weareoneEXO',
  },

  '': {
    debut: '',
    members: [
      '',
    ],
    leader: '',
    label: '',
    fandom: '',
    albums: [

    ],
    twitterID: '',
    twitterIDurl: '',
  },

  '': {
    debut: '',
    members: [
      '',
    ],
    leader: '',
    label: '',
    fandom: '',
    albums: [

    ],
    twitterID: '',
    twitterIDurl: '',
  },


}