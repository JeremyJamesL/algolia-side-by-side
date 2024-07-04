const config = {
  title: `Company name side by side`,
  algoliaConfig: {
    appID: "", // Algolia appID
    publicApiKey: "", // Algolia search API key
    // Max 2
    indices: {
      indexOne: "", // Index 1 name
      indexTwo: "", // Index 2 name
    },
  },
};

export default config;
