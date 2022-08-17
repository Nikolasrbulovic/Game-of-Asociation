let igraci = getSavedJSON("igraci");

upamtiAsocijacije(asocijacijePrimeri);
let asocijacija1 = getSavedJSON("Asocijacije");
const rnd = randomIntFromInterval(0, 4);
const asocijacija = asocijacija1[rnd];

let poeni = [
  {
    A: 5,
    B: 5,
    C: 5,
    D: 5,
  },
];
let buttonClicked = false;
let gameOver = false;

let counts = setInterval(updated, 1000);
let upto = 0;
let vremeIgre = 0;
let vreme = "";

function updated() {
  document.getElementById("vremeigre").innerHTML = ++vremeIgre;
  if (igraci[0].IsActive) {
    vreme = "vreme1";
  } else {
    vreme = "vreme2";
  }
  var count = document.getElementById(vreme);
  count.innerHTML = ++upto;
  if (upto % 10 === 0) {
    buttonClicked = false;
    igraci[0].IsActive = !igraci[0].IsActive;
    igraci[1].IsActive = !igraci[1].IsActive;
    clearInterval(counts);
    count.innerHTML = "0";
    upto = 0;
    counts = setInterval(updated, 1000);
  }
  if (vremeIgre == 240) {
    clearInterval(counts);
  }
}

document.querySelectorAll("div.Asocijacija1 > button").forEach((el) =>
  el.addEventListener("click", function (e) {
    console.log(buttonClicked);
    if (buttonClicked == false) {
      buttonClicked = true;
      const id = e.srcElement.id;
      let button = document.getElementById(id);
      let color;
      poeni[0][id.substr(0, 1)]--;
      console.log(poeni);

      document.getElementById(id).innerHTML = asocijacija[id];

      if (igraci[0].IsActive) {
        color = "blue";
      } else {
        color = "red";
      }
      button.style.backgroundColor = color;
      button.disabled = true;
    }
  })
);

zameniAktivnogIgraca = () => {
  if (gameOver !== true) {
    igraci[0].IsActive = !igraci[0].IsActive;
    igraci[1].IsActive = !igraci[1].IsActive;
    buttonClicked = false;
    document.getElementById(vreme).innerHTML = "0";
    clearInterval(counts);
    upto = 0;
    counts = setInterval(updated, 1000);
  }
};
pogodjenaKolona = (kolona) => {
  kolona.value = asocijacija[kolona.id];

  if (igraci[0].IsActive) {
    poeni[0][kolona.id.substr(0, 1)]--;

    igraci[0].Poeni = igraci[0].Poeni + poeni[0][kolona.id.substr(0, 1)] + 5;
    poeni[0][kolona.id.substr(0, 1)] = 0;

    color = "blue";
  } else {
    color = "red";
    igraci[1].Poeni = igraci[1].Poeni + poeni[0][kolona.id.substr(0, 1)] + 5;
    poeni[0][kolona.id.substr(0, 1)] = 0;
  }
  kolona.style.backgroundColor = color;

  document.querySelectorAll("div.Asocijacija1 > button").forEach((el) => {
    if (el.classList[1] == [kolona.id.substr(0, 1)]) {
      el.style.backgroundColor = color;

      document.getElementById(el.id).innerHTML = asocijacija[el.id];
      el.disabled = true;
    }
  });
};
pogodjenKrajnjiResultat = (kolona) => {
  gameOver = true;
  kolona.value = asocijacija[kolona.id];
  if (igraci[0].IsActive) {
    color = "blue";

    igraci[0].Poeni =
      igraci[0].Poeni + poeni[0].A + poeni[0].B + poeni[0].C + poeni[0].D + 10;
  } else {
    color = "red";
    igraci[1].Poeni =
      igraci[1].Poeni + poeni[0].A + poeni[0].B + poeni[0].C + poeni[0].D + 10;
  }
  document.querySelectorAll("div.Asocijacija1 > button").forEach((el) => {
    el.style.backgroundColor = color;
    document.getElementById(el.id).innerHTML = asocijacija[el.id];
    el.disabled = true;
  });
  document.querySelectorAll("input").forEach((el) => {
    el.style.backgroundColor = color;
    document.getElementById(el.id).value = asocijacija[el.id];
    el.disabled = true;
  });

  clearInterval(counts);
  setTimeout(() => {
    document.getElementById("vreme1").innerHTML = "Poeni :" + igraci[0].Poeni;
    document.getElementById("vreme2").innerHTML = "Poeni :" + igraci[1].Poeni;
  }, 2000);
};
document.querySelectorAll("input").forEach((el) =>
  el.addEventListener("keypress", function (e) {
    const id = e.srcElement.id;

    const kolona = document.getElementById(id);
    let color;

    if (e.key === "Enter" && kolona.value.toUpperCase() === asocijacija[id]) {
      buttonClicked = true;
      id === "resenje"
        ? pogodjenKrajnjiResultat(kolona)
        : pogodjenaKolona(kolona);

      document.getElementById(vreme).innerHTML = "0";

      zameniAktivnogIgraca();
      console.log(igraci);
    }

    if (e.key === "Enter" && kolona.value.toUpperCase() !== asocijacija[id]) {
      kolona.value = "";
      zameniAktivnogIgraca();
    }
  })
);
document.getElementById("dalje").addEventListener("click", function (e) {
  zameniAktivnogIgraca();
});
