let query = `
query ($id: Int) {
  Media (id: $id, type: ANIME) { 
    id
    title {
      english
      native
    }
    description
    coverImage {
      medium
    }
    rankings {
      rank
      type
      context
    }
  }
}
`;

let variables = {
  id: 1,
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
      console.log(json.data.Media);
      let data = json.data.Media;
      const wrapper = document.querySelector(".wrapper");
      const newDiv = document.createElement("div");

      newDiv.classList.add("card");
      const title = document.createElement("h3");
      title.classList.add("card-title");
      title.innerHTML = data.title.english;
      wrapper.appendChild(newDiv);
      newDiv.appendChild(title);
    });
data();
