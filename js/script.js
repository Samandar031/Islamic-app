let mundarija = document.querySelector(".basic_menu");
let polniy = document.querySelector(".mini_content");
let getCard = document.querySelector(".mini_content");
let basic = document.querySelector(".basic_title");

let ArrBox = [];

const fetchFunc = async function () {
  let a = 1;
  let b = 114;

  let nomi = await fetch(`https://api.quran.sutanlab.id/surah`);
  let nomiJson = await nomi.json();

  let uzb = await fetch(
    `https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/uzb-alaaudeenmansou.json`
  );
  let uzbJson = await uzb.json();

  for (let i = a; i <= b; i++) {
    let b = await fetch(`https://api.quran.sutanlab.id/surah/${i}`);
    let bJson = await b.json();

    ArrBox.push(bJson);
    renderFunc(bJson.data, uzbJson.quran, nomiJson.data);
  }
};

fetchFunc();

// mundarija qismini chiqarish
const renderFunc = function (bir, ikki, uch) {
  let uzbArr = ikki.filter((val) => {
    return val.chapter == bir.number;
  });

  let findEL;

  uch.forEach((val) => {
    let span = document.createElement("span");
    span.textContent = val.number;

    let div = document.createElement("div");
    div.classList.add("basic_menu_parts");
    div.textContent = `${val.name.transliteration.en}`;
    div.id = `${val.name.transliteration.en}`;

    div.prepend(span);

    // let htmlAdd = ` <div class="basic_menu_parts">
    // <span>${val.number}.</span>${val.name.transliteration.en}</div>`;

    mundarija.append(div);

    div.addEventListener("click", function () {
      polniy.innerHTML = "";

      findEL = div.id;

      let filter = ArrBox.find((val) => {
        return val.data.name.transliteration.en == findEL;
      });

      basic.innerHTML = "";
      let title = `<div class="content_title">${filter.data.name.transliteration.en}</div>`;
      basic.insertAdjacentHTML("afterbegin", title);

      for (let i = 0; i < ArrBox.length; i++) {
        let arabic = `<div class="content_description content_arabic">${
          filter.data.verses[i].text.arab
        }</div>
        <div class="content_description content_uzbek">${
          uzbArr[i] ? uzbArr[i].text : ""
        }
        </div>
        
        <audio id="player"  controls class="audio">
        <source src="${
          filter.data.verses[i].audio.secondary[0]
        }" type="audio/ogg">
        <source src="${
          filter.data.verses[i].audio.secondary[0]
        }" type="audio/mpeg">
      </audio>`;

        getCard.insertAdjacentHTML("beforeend", arabic);

        console.log(filter.data.name.transliteration);
      }

      var x = 0;
      var music = document.getElementById("player");

      $("#player").bind("ended", function () {
        x = x + 1;
        music.src = (x % 4) + "/ogg";
        music.load();
        music.play();
      });
    });
  });
};
// //////////////////////////////////
