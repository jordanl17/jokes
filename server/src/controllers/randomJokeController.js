import fileService from "../services/fileService";

const randomJoke = (req, res) => {
  fileService
    .allJokes()
    .then(jokes => {
      if (req.query.filter) {
        // filter out jokes container the filter substring
        jokes = jokes.filter(joke => joke.includes(req.query.filter));
      }
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
