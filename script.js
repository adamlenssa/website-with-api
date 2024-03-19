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
      data.map((anime) => console.log(anime.title));
    })
    .catch((err) => console.log(err));
data();
// }
