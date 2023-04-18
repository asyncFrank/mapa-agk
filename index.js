let unidades = [
  {
    uid: 1,
    uf: "AL",
    state: "Alagoas",
    _data: "01 de Janeiro a 01 de Abril",
    _regiao: " ",
  },
  {
    uid: 2,
    uf: "AP",
    state: "Amapá",
    _data: "01 de Dezembro a 28 de Fevereiro",
    _regiao: " ",
  },
  {
    uid: 3,
    uf: "AC",
    state: "Acre",
    _data: "22 de Junho a 20 de Setembro",
    _regiao: " ",
  },
];

const createTextRow = (div, text, qtd, image) => {
  const myimage = document.createElement("img");
  let base_url =
    window.location.origin +
    "/" +
    window.location.pathname.split("/")[1] +
    "/" +
    window.location.pathname.split("/")[2] +
    "/" +
    window.location.pathname.split("/")[3];

  console.log(base_url);
  myimage.src = `${base_url}/${image}`;

  const p = document.createElement("p");
  p.innerText = text;

  const span = document.createElement("span");
  span.innerText = qtd;

  div.appendChild(myimage);
  div.appendChild(p);
  div.appendChild(span);
};

const createCard = (name, death, suspect, cases, uf) => {
  const container = document.querySelector(".container");

  const card = document.createElement("div");
  card.className = "card";

  const stateImage = document.createElement("div");
  stateImage.id = "state-image";
  stateImage.style.backgroundImage = `url("assets/${uf}.svg")`;

  const textDiv = document.createElement("div");
  textDiv.className = "text-div";

  const h2 = document.createElement("h2");
  h2.innerText = name;

  const textRow1 = document.createElement("div");
  textRow1.className = "text-row";

  const textRow2 = document.createElement("div");
  textRow2.className = "text-row";

  const textRow3 = document.createElement("div");
  textRow3.className = "text-row";

  createTextRow(textRow1, "", cases, "/assets/icons/no-soy.png");
  // createTextRow(textRow2, "Mortes", death, "/projects-alexandre/svg-Brasil-mapa-coronavirus/assets/icons/death.svg");
  // createTextRow(textRow3, "Suspeitos", suspect, "/projects-alexandre/svg-Brasil-mapa-coronavirus/assets/icons/suspect.svg");

  textDiv.appendChild(h2);
  textDiv.appendChild(textRow1);
  textDiv.appendChild(textRow2);
  textDiv.appendChild(textRow3);

  // stateImage.appendChild(textDiv);

  card.appendChild(stateImage);
  card.appendChild(textDiv);

  container.appendChild(card);
};

(function () {
  var states = document.getElementsByClassName("estado");

  for (var i = 0; i < states.length; i++) {
    states[i].onclick = async function () {
      let card = document.querySelector(".card");
      if (card) {
        let container = document.querySelector(".container");
        container.removeChild(card);
      }

      let name = this.getAttribute("name");
      let sigla = this.querySelector("text").textContent.toLowerCase();
      sigla = sigla.replace(/\s/g, "");

      // let data = await fetch(
      //   `https://covid19-brazil-api.now.sh/api/report/v1/brazil/uf/${sigla}`
      // );
      //localhost:5000/api/periods/uf?uf=PB
      http: console.log(sigla);
      // let data = await fetch(`http://localhost:5000/api/periods/uf?uf=${sigla}`)
      let data = await fetch(
        // `https://backend-provi.vercel.app/api/periods/uf?uf=${sigla}`
        `https://nodedeploy-api-uubc.onrender.com/periods/period/${sigla}`
        
      );
      console.log(data);

      const { uf, period } = await data.json();
      console.log(period);
      createCard(name, "", "", period, sigla);
    };
  }
})();
