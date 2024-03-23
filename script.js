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

const images = [
  [
    "https://i5.walmartimages.com/seo/Naruto-Shippuden-Group-Wall-Poster-22-375-x-34-Framed_cea502c6-8a2b-4f23-b7cf-3dbaddd3b5f0.60e9f542d46f764023e4f7415684d99e.jpeg",
    "https://cdn.i-scmp.com/sites/default/files/d8/images/canvas/2022/06/10/5276d02e-5217-4f55-91a2-7d60186a6038_162e016e.jpg",
    "https://i.pinimg.com/originals/1a/08/3b/1a083be414f042266850207d8badf284.jpg",
    "https://miro.medium.com/v2/resize:fit:1400/1*10sQCBzHcWFfPS6Lxl3VhQ.jpeg",
    "https://gritdaily.com/wp-content/uploads/2020/06/netmarble_seven-deadly-sins-grand-cross.jpg",
    "https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2023%2F08%2FNetflixs-%E2%80%98Baki-Hanma-New-Season-2-Trailer-0.jpg?fit=max&cbr=1&q=90&w=750&h=500",
    "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p10701949_b_v8_ah.jpg",
    "https://image.api.playstation.com/vulcan/ap/rnd/202007/1308/StbziMS5VEhNntVpqjIRyOl1.png",
    "https://demonslayer-hinokami.sega.com/img/purchase/digital-standard.jpg",
    "https://m.media-amazon.com/images/M/MV5BNGY4MTg3NzgtMmFkZi00NTg5LWExMmEtMWI3YzI1ODdmMWQ1XkEyXkFqcGdeQXVyMjQwMDg0Ng@@._V1_.jpg",
  ],
  [
    "https://i5.walmartimages.com/seo/Naruto-Shippuden-Group-Wall-Poster-22-375-x-34-Framed_cea502c6-8a2b-4f23-b7cf-3dbaddd3b5f0.60e9f542d46f764023e4f7415684d99e.jpeg",
    "https://cdn.i-scmp.com/sites/default/files/d8/images/canvas/2022/06/10/5276d02e-5217-4f55-91a2-7d60186a6038_162e016e.jpg",
    "https://i.pinimg.com/originals/1a/08/3b/1a083be414f042266850207d8badf284.jpg",
    "https://miro.medium.com/v2/resize:fit:1400/1*10sQCBzHcWFfPS6Lxl3VhQ.jpeg",
    "https://gritdaily.com/wp-content/uploads/2020/06/netmarble_seven-deadly-sins-grand-cross.jpg",
    "https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2023%2F08%2FNetflixs-%E2%80%98Baki-Hanma-New-Season-2-Trailer-0.jpg?fit=max&cbr=1&q=90&w=750&h=500",
    "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p10701949_b_v8_ah.jpg",
    "https://image.api.playstation.com/vulcan/ap/rnd/202007/1308/StbziMS5VEhNntVpqjIRyOl1.png",
    "https://demonslayer-hinokami.sega.com/img/purchase/digital-standard.jpg",
    "https://m.media-amazon.com/images/M/MV5BNGY4MTg3NzgtMmFkZi00NTg5LWExMmEtMWI3YzI1ODdmMWQ1XkEyXkFqcGdeQXVyMjQwMDg0Ng@@._V1_.jpg",
  ],
];

const buildHeroSlides = (images) => {
  images.forEach((set) => {
    const heroImage = document.querySelector(".hero-images");
    const slide = document.createElement("div");
    slide.classList.add("slide");
    set.map((url) => {
      const imgWrapper = document.createElement("div");
      imgWrapper.classList.add("img");
      const img = document.createElement("img");
      img.src = url;
      imgWrapper.appendChild(img);
      slide.appendChild(imgWrapper);
    });
    heroImage.appendChild(slide);
  });
};

buildHeroSlides(images);
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
      counterBuilder(data);
      buildCards(data);
      changeLocation();
      [recoButtons, favButtons].forEach((buttonset) =>
        buttonEventListener(buttonset)
      );
    })
    .catch((err) => console.error(err));
buildProjectDom();
