const igraci = [
  {
    Ime: "",
    Checkbox: false,
    Key: "Plavi",
    IsActive: true,
    Poeni: 0,
   
  },
  {
    Ime: "",
    Checkbox: false,
    Key: "Crveni",
    IsActive: false,
    Poeni: 0,
    
  },
];

document.querySelector("#igrac1").addEventListener("input", function (e) {
  igraci[0].Ime = e.target.value;
});
document.querySelector("#igrac2").addEventListener("input", function (e) {
  igraci[1].Ime = e.target.value;
});
document.querySelector("#checkbox1").addEventListener("change", function (e) {
  igraci[0].Checkbox = e.target.checked;
});
document.querySelector("#checkbox2").addEventListener("change", function (e) {
  igraci[1].Checkbox = e.target.checked;
});

document.querySelector("#submit").addEventListener("click", function (e) {
 
  e.preventDefault();

  if (igraci[0].Checkbox == true && igraci[1].Checkbox == true) {
    upamtiIgrace(igraci);
    location.assign("./Asocijacije-igra.html");
  }
});

const upamtiIgrace = function (igraci) {
  localStorage.setItem("igraci", JSON.stringify(igraci));
};
