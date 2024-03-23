const number = Math.floor(Math.random() * 10 + 1);

let query = `
query GetFirstsThree{
  Page(page: ${number}, perPage: 30) {
    media{
      title{
        english
        native
    	}
   	popularity
    source
    coverImage{
    	large
    }
    description
    }
    
  }

}
  `;

const url = "https://graphql.anilist.co";
const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  body: JSON.stringify({
    query: query,
  }),
};
const original = document.getElementById("anime");
const favorite = document.getElementById("favorites");
const recoButtons = document.querySelectorAll(".sortbtn");
const favButtons = document.querySelectorAll(".sortbtnfav");
const counter = (data) => {
  const counts = {};
  data.forEach((anime) => {
    const source = anime.source;
    const counting = counts.hasOwnProperty(source)
      ? (counts[`${source}`] = counts[`${source}`] + 1)
      : (counts[`${source}`] = 1);
    console.log(source);
  });
  return counts;
};

const counterBuilder = (data) => {
  const counts = counter(data);
  const counterDiv = document.querySelector(".counter");
  for (const [key, value] of Object.entries(counts)) {
    const information = document.createElement("h3");
    information.innerText = `${key}: ${value}`;
    counterDiv.appendChild(information);
  }
};

const buildCards = (data) => {
  data.forEach((anime) => {
    const wrapper = document.querySelector("#anime");
    const card = document.createElement("div");
    const imgWrapper = document.createElement("div");
    const image = document.createElement("img");
    const title = document.createElement("h3");
    const about = document.createElement("p");
    card.classList.add("card");
    card.setAttribute("id", data.indexOf(anime) + 1);
    image.src = anime.coverImage.large;
    imgWrapper.appendChild(image);
    const titleText = anime.title.english
      ? `${anime.title.english} - ${anime.title.native}`
      : `${anime.title.native}`;
    title.innerHTML = titleText;
    about.innerHTML = anime.description;
    card.appendChild(imgWrapper);
    card.appendChild(title);
    card.appendChild(about);
    wrapper.appendChild(card);
  });
};

function updateLocation(elm, direction) {
  const container = direction === "anime" ? favorite : original;
  container.appendChild(elm);
}
const changeLocation = () => {
  const cards = document.querySelectorAll(".card");
  for (const card of cards) {
    card.addEventListener("click", function () {
      const direction = card.parentElement.id;
      updateLocation(card, direction);
    });
  }
};

const sortCards = (direction, container) => {
  const newArray = Array.from(container.childNodes);
  console.log(Array.from(container.childNodes));
  const sort = (a, b) => {
    if (a.children[1].innerText < b.children[1].innerText)
      return direction === "desc" ? 1 : -1;
    else if (a.children[1].innerText > b.children[1].innerText)
      return direction === "desc" ? -1 : 1;
    else return 0;
  };
  newArray.sort(sort);
  newArray.forEach((item) => container.append(item));
};

const buttonEventListener = (arrOfButtons) => {
  const cardsInOriginal = original.childNodes;
  const cardsInFavs = favorite.childNodes;
  const params =
    arrOfButtons === recoButtons
      ? [original, cardsInOriginal]
      : [favButtons, cardsInFavs];
  arrOfButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const direction = this.dataset.sortdir.toString();
      sortCards(direction, params[0], params[1]);
    });
  });
};
const buildProjectDom = async () =>
  await fetch(url, options)
    .then((response) => response.json())
    .then((json) => {
      const data = json.data.Page.media;
      console.log(data);
      counterBuilder(data);
      buildCards(data);
      changeLocation();
      [recoButtons, favButtons].forEach((buttonset) =>
        buttonEventListener(buttonset)
      );
    })
    .catch((err) => console.log(err));
buildProjectDom();
