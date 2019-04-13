import fileService from "../services/fileService";

const randomJoke = (req, res) => {
  console.log("random");
  fileService
    .allJokes()
    .then(jokes => {
      const randomIndex = Math.floor(Math.random() * jokes.length);
      res.status(200);
      res.send(jokes[randomIndex]);
    })
    .catch(err => {
      res.status(400);
      res.send(err);
    });
};

export default randomJoke;
