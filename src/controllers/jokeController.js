import fileService from "../services/fileService";

const all = (req, res) =>
  fileService
    .allJokes()
    .then(jokes => {
      res.status(200);
      res.send(jokes);
    })
    .catch(err => {
      res.status(400);
      res.send(err);
    });

const add = (req, res) => {
  console.log(req.body);
  const { joke: newJoke } = req.body;
  fileService.addJoke(newJoke).then(() => res.sendStatus(200));
};

const get = (req, res) => {
  const { id } = req.query;
  fileService
    .getById(id)
    .then(response => {
      res.status(200);
      res.send(response);
    })
    .catch(err => {
      res.status(400);
      res.send(err);
    });
};

const remove = (req, res) => {
  const { id } = req.query;
  fileService
    .deleteById(id)
    .then(() => res.sendStatus(200))
    .catch(err => {
      res.status(400);
      res.send(err);
    });
};

const update = (req, res) => {
  const { id } = req.query;
  const { joke } = req.body;

  fileService
    .updateById({ id, joke })
    .then(() => res.sendStatus(200))
    .catch(err => {
      res.status(400);
      res.send(err);
    });
};

export default { all, add, get, remove, update };
