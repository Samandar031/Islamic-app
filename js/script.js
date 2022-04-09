let mundarija = document.querySelector(".basic_menu");

function getMun() {
  fetch("https://api.quran.sutanlab.id/surah")
    .then((res) => {
      return res.json();
    })
    .then((resp) => {
      html(resp.data);
      // console.log(resp.data[0]);
    });
}
getMun();

function html(a) {
  a.forEach((el) => {
    let htmlAdd = ` <div class="basic_menu_parts"><span>${el.number}.</span>${el.name.transliteration.en}</div>`;

    mundarija.insertAdjacentHTML("beforeend", htmlAdd);
  });
}

let getArabic = document.querySelector(".content_title_text_one");
let getIngliz = document.querySelector(".content_title_text_two");

let arr = [];

function getEnglish(key) {
  fetch(`https://api.quran.sutanlab.id/surah/${key}`)
    .then((res) => res.json())
    .then((resp) => {
      surahAdd(resp.data.verses);
      console.log(resp.data.verses);
    });
}

function surahAdd(a) {
  a.forEach((el) => {
    let arabic = `<div class="content_description content_uzbek">${el.text.arab}</div>`;
    let englishL = ` <div class="content_description content_arabic">${el.text.transliteration.en}
    </div>`;

    getArabic.insertAdjacentHTML("beforeend", arabic);
    getIngliz.insertAdjacentHTML("beforeend", englishL);
  });
}

getEnglish(1);

function getMusic(val) {
  fetch(`https://api.quran.sutanlab.id/surah/${val}`)
    .then((res) => res.json())
    .then((resp) => {
      surahAdd(resp.data.verses);
      addMusic(resp.data.verses);
      console.log(resp.data.verses);
      // console.log(resp.data.verses);
    });
}
getMusic(1);

let musicPush = [];

let musicAdd = document.querySelector(".audio_box");
function addMusic(m) {
  m.forEach((el) => {
    musicPush.push(el.audio.primary);
  });

  let music = `<audio controls>
    <source src=.mp3, type="audio/ogg">
    <source src=${musicPush}.mp3, type="audio/mpeg">
  </audio>`;
  musicAdd.insertAdjacentHTML("beforeend", music);
}
console.log(musicPush);
