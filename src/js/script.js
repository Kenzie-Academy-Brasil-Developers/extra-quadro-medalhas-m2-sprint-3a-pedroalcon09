/* endpoint : https://kenzie-olympics.herokuapp.com/paises */

//class for the icons --> fas fa-angle-down  /  fas fa-angle-up

const searchBar = document.getElementById("search-bar");
const searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", searchOneCountry);

const filterPos = document.getElementById("icon-position");
filterPos.addEventListener("click", sortArrayPosition);

const filterGold = document.getElementById("icon-gold");
filterGold.addEventListener("click", sortGold);

const filterSilver = document.getElementById("icon-silver");
filterSilver.addEventListener("click", sortSilver);

const filterBronze = document.getElementById("icon-bronze");
filterBronze.addEventListener("click", sortBronze);

let countryArray = [];

async function getCountry() {
  const arrayCountry = await fetch(
    "https://kenzie-olympics.herokuapp.com/paises"
  )
    .then((response) => response.json())
    .then((r) => r);
  return arrayCountry;
}

getCountry().then((resp) => {
  countryArray = [...resp];
  sortArrayPosition(countryArray);
});

function buildTable(array) {
  const table = document.getElementById("table");
  const linhas = document.querySelectorAll("tr");

  if (linhas.length > 1) {
    for (let i = 1; i < linhas.length; i++) {
      linhas[i].remove();
    }
  }

  //loop for through array
  for (let i = array.length - 1; i >= 0; i--) {
    //tr
    const paiLinha = document.createElement("tr");
    paiLinha.setAttribute("class", "country-line");
    //td posicao
    const posicao = document.createElement("td");
    posicao.setAttribute("id", "position");
    posicao.innerText = `${array.length - i}º`;
    paiLinha.appendChild(posicao);
    //td pais c icone
    const bandeira = document.createElement("td");
    bandeira.setAttribute("id", "bandeira");
    const iconeBandeira = document.createElement("img");
    bandeira.innerText = array[i].country;
    iconeBandeira.setAttribute("src", array[i].flag_url);
    bandeira.appendChild(iconeBandeira);
    paiLinha.appendChild(bandeira);
    //td ouro
    const ouro = document.createElement("td");
    ouro.setAttribute("id", "ouro");
    ouro.innerText = array[i].medal_gold;
    paiLinha.appendChild(ouro);
    //td prata
    const prata = document.createElement("td");
    prata.setAttribute("id", "prata");
    prata.innerText = array[i].medal_silver;
    paiLinha.appendChild(prata);
    //td bronze
    const bronze = document.createElement("td");
    bronze.setAttribute("id", "bronze");
    bronze.innerText = array[i].medal_bronze;
    paiLinha.appendChild(bronze);
    //td pontuacao
    const total = document.createElement("td");
    total.setAttribute("id", "total");
    total.innerText =
      array[i].medal_gold + array[i].medal_silver + array[i].medal_bronze;
    paiLinha.appendChild(total);
    //append to table tag
    table.appendChild(paiLinha);
  }
}

function sortGold() {
  const sorted = countryArray.sort(function (a, b) {
    if (a.medal_gold > b.medal_gold) {
      return 1;
    }
    if (a.medal_gold < b.medal_gold) {
      return -1;
    }
    if (a.medal_gold === b.medal_gold) {
      return 0;
    }
  });
  buildTable(sorted);
  return sorted;
}

function sortSilver() {
  const sorted = countryArray.sort(function (a, b) {
    if (a.medal_silver > b.medal_silver) {
      return 1;
    }
    if (a.medal_silver < b.medal_silver) {
      return -1;
    }
    if (a.medal_silver === b.medal_silver) {
      return 0;
    }
  });
  buildTable(sorted);
  return sorted;
}

function sortBronze() {
  const sorted = countryArray.sort(function (a, b) {
    if (a.medal_bronze > b.medal_bronze) {
      return 1;
    }
    if (a.medal_bronze < b.medal_bronze) {
      return -1;
    }
    if (a.medal_bronze === b.medal_bronze) {
      return 0;
    }
  });
  buildTable(sorted);
  return sorted;
}

function sortArrayPosition() {
  const sorted = countryArray.sort(function (a, b) {
    let aMedals = a.medal_bronze + a.medal_silver + a.medal_gold;
    let bMedals = b.medal_bronze + b.medal_silver + b.medal_gold;

    if (aMedals > bMedals) {
      return 1;
    }
    if (aMedals < bMedals) {
      return -1;
    }
    if (aMedals === bMedals) {
      if (a.medal_gold > b.medal_gold) {
        return 1;
      }
      if (a.medal_gold < b.medal_gold) {
        return -1;
      }
      if (a.medal_gold === b.medal_gold) {
        return 0;
      }
    }
  });
  buildTable(sorted);
  return sorted;
}

function searchOneCountry() {
  let oneCountry = [];

  if (searchBar.value === "") {
    buildTable(countryArray);
  } else {
    oneCountry.push(
      countryArray.find((elem) => {
        if (elem.country === searchBar.value) {
          return elem;
        }
      })
    );
    buildTable(oneCountry);
  }
}
