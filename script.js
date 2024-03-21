// for (let i = 1; i < 31; i++) {
let query = `
query GetFirstsThree{
  Page(page: 1, perPage: 30) {
    media{
      title{
        english
        native
    	}
   	popularity
    coverImage{
    	large
    }
    description
    }
    
  }

}
  `;

let variables = {
  id: 2,
};

const url = "https://graphql.anilist.co",
  options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: query,
      // variables: variables,
    }),
  };
let me = undefined;
const data = async () =>
  await fetch(url, options)
    .then((response) => response.json())
    .then((json) => {
      const data = json.data.Page.media;
      data.map((anime) => {
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
      const original = document.getElementById("anime");
      const favorite = document.getElementById("favorites");
      const cards = document.querySelectorAll(".card");
      function updateLocation(elm, direction) {
        if (direction === "anime") {
          favorite.appendChild(elm);
        } else {
          original.appendChild(elm);
        }
      }
      for (const card of cards) {
        card.addEventListener("click", function () {
          const direction = card.parentElement.id;
          updateLocation(card, direction);
        });
      }

      const recoButtons = document.querySelectorAll(".sortbtn");
      const favButtons = document.querySelectorAll(".sortbtnfav");
      const cardsInOriginal = original.childNodes;
      const cardsInFavs = favorite.childNodes;
      const sortCards = (direction, container, nodelist) => {
        const newArray = Array.from(container.childNodes);
        console.log(Array.from(container.childNodes));
        const sortCB = (a, b) => {
          if (a.children[1].innerText < b.children[1].innerText) return 1;
          else if (a.children[1].innerText > b.children[1].innerText) return -1;
          else return 0;
        };
        const sortAB = (a, b) => {
          if (a.children[1].innerText > b.children[1].innerText) return 1;
          else if (a.children[1].innerText < b.children[1].innerText) return -1;
          else return 0;
        };
        if (direction === "desc") {
          newArray.sort(sortCB);
          newArray.forEach((item) => container.append(item));
        } else {
          newArray.sort(sortAB);
          newArray.forEach((item) => container.append(item));
        }
      };
      for (const button of recoButtons) {
        button.addEventListener("click", function () {
          const direction = this.dataset.sortdir.toString();
          sortCards(direction, original, cardsInOriginal);
        });
      }
      for (const button of favButtons) {
        button.addEventListener("click", function () {
          const direction = this.dataset.sortdir.toString();
          sortCards(direction, favorite, cardsInFavs);
        });
      }
    })
    .catch((err) => console.log(err));
data();
