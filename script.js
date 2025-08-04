// Countrys Json load
countriesData = [];
currencyGlobal = "EUR";

fetch("countries.json")
  .then((response) => response.json())
  .then((countries) => {
    countriesData = countries;

    countries.sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });

    const select = document.getElementById("countrySelect");
    countries.forEach((country) => {
      const option = document.createElement("option");
      option.value = country.code;
      option.textContent = country.name;
      select.appendChild(option);
    });
    $("#countrySelect").val("DE").trigger("change");
  })
  .catch((err) => console.error("Fehler beim Laden der Länder:", err));

function berechneTrinkgeld() {
  const betrag = parseFloat(document.getElementById("betrag").value);
  const prozent = parseFloat(document.getElementById("prozent").value);

  if (isNaN(betrag) || isNaN(prozent) || betrag < 0 || prozent < 0) {
    document.getElementById("ergebnis").textContent =
      "Bitte gültige Werte eingeben.";
    return;
  }

  const trinkgeld = (betrag * prozent) / 100;
  const gesamt = betrag + trinkgeld;

  //prettier-ignore

  document.getElementById("ergebnis").innerHTML = `
        Trinkgeld: <strong>${trinkgeld.toFixed(2)} <span class="waehrung">${currencyGlobal}</span></strong><br>
        Gesamtsumme: <strong>${gesamt.toFixed(2)} <span class="waehrung">${currencyGlobal}</span></strong>
      `;
}
$("#countrySelect").select2({
  placeholder: "Land",
});
$("#currencySelect").select2({
  placeholder: "€",
});

$("#countrySelect").on("change", function () {
  UeblicheProzenteBerechnen($(this).val());
});
$("#currencySelect").on("change", function () {
  ChangeCurrency($(this).val());
  console.log($(this).val());
});

function UeblicheProzenteBerechnen(LandCode) {
  let land;
  for (let i = 0; i < countriesData.length; i++) {
    if (countriesData[i].code === LandCode) {
      land = countriesData[i];
      break;
    }
  }
  document.getElementById("UeblichAusgabe").innerHTML = land.tips;
}

function ChangeCurrency(currency) {
  currencyGlobal = currency;
  if (currency != "other") {
    const waehrungsElements = document.querySelectorAll(".waehrung");
    waehrungsElements.forEach((el) => {
      el.textContent = currency;
    });
  }
}

window.onload = function () {
  document.getElementById("currencySelect").value = "EUR";
};
