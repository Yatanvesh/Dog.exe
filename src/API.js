const rootUrl = 'http://192.168.43.224:3000';

export const getRandomDog = async () => {
  try {
    let response = await fetch(`${rootUrl}/dog/`);
    if (response.ok) {
      let json = await response.json();
      return json.url;
    }

  } catch (error) {
    console.log(error);
    return false;
  }
}