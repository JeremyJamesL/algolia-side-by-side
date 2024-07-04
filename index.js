import algoliasearch from "algoliasearch/lite";
import instantsearch from "instantsearch.js";
import {
  searchBox,
  hits,
  index,
  pagination,
} from "instantsearch.js/es/widgets";
import config from "./config.js";

// Elements
const title = document.querySelector(".title");
const indexTitle = document.querySelectorAll(".index-title");

// Algolia
const searchClient = algoliasearch(
  config.algoliaConfig.appID,
  config.algoliaConfig.publicApiKey
);

const search = instantsearch({
  indexName: config.algoliaConfig.indices.indexOne,
  searchClient,
});

const hitTemplate = (el) => {
  return `

                <img src=${el.imageUrl} class="hit-image"/>

           <div class="hit-body">
               <h2 class="hit-title">${el.name}</h2>
               <p class"hit-brand"><strong>Brand:</strong> ${el.firm}</p>
               <p class"hit-brand"><strong>Category:</strong> ${el.categoryName}</p>
           </div>
`;
};

search.addWidgets([
  searchBox({
    container: "#searchbox",
  }),

  hits({
    container: "#hits",
    cssClasses: {
      list: "hits-list",
      item: "hit",
    },
    templates: {
      item: (hit) => hitTemplate(hit),
    },
  }),

  pagination({
    container: "#pagination",
  }),

  index({ indexName: config.algoliaConfig.indices.indexTwo }).addWidgets([
    hits({
      container: "#hits2",
      cssClasses: {
        list: "hits-list",
        item: "hit",
      },
      templates: {
        item: (hit) => hitTemplate(hit),
      },
    }),
    pagination({
      container: "#pagination2",
    }),
  ]),
]);

search.start();

// Other
title.textContent = config.title;
indexTitle[0].textContent = config.algoliaConfig.indices.indexOne;
indexTitle[1].textContent = config.algoliaConfig.indices.indexTwo;
