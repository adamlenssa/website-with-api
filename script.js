// for (let i = 1; i < 31; i++) {
let query = `
query GetFirstsThree{
  Page(page: 1, perPage: 30) {
    media{
      title{
        english
        native
    	}
     id
   	popularity
    coverImage{
    	medium
    }
    source
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
      variables: variables,
    }),
  };
let me = undefined;
const data = async () =>
  await fetch(url, options)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      const data = json.data.Page.media;
      data.map((anime) => {
        const wrapper = document.querySelector(".wrapper");
        const card = document.createElement("div");
        const imgWrapper = document.createElement("div");
        const image = document.createElement("img");
        const title = document.createElement("h3");
        const about = document.createElement("p");
        console.log(anime.coverImage);
        image.src = anime.coverImage.medium;
        imgWrapper.appendChild(image);
        card.appendChild(imgWrapper);
        wrapper.appendChild();
      });
    })
    .catch((err) => console.log(err));
data();
// }
