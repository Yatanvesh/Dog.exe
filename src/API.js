// const rootUrl = 'http://192.168.43.224:3000';
const rootUrl = 'https://silicon-scraper.herokuapp.com';

export const getRandomDog = async () => {
  try {
    let response = await fetch(`${rootUrl}/dog/`);
    if (response.ok)
      return await response.json();
  } catch (error) {
    console.log(error);
    return false;
  }
}