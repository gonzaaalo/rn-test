
const getCharacters = async () => {
  try {
      const response = await fetch(
        'https://swapi.dev/api/people'
      );
      const json = await response.json();
      return json.results;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default getCharacters;