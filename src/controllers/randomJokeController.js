import fileService from "../services/fileService";

const randomJoke = (req, res) => {
  fileService.allJokes().then(jokes => {
    const randomIndex = Math.floor(Math.random() * jokes.length);
    res.send(jokes[randomIndex]);
  });
};

export default randomJoke;
