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
  if (!req.body || !req.body.joke) {
    res.status(400);
    res.send("must have joke body");
    return;
  }
  const { joke: newJoke } = req.body;
  fileService
    .addJoke(newJoke)
    .then(() => res.sendStatus(200))
    .catch(err => {
      res.status(400);
      res.send(err);
    });
};

const get = (req, res) => {
  if (!req.query || !req.query.id) {
    res.status(400);
    res.send("must have joke id");
    return;
  }
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
  if (!req.query || !req.query.id) {
    res.status(400);
    res.send("must have joke id");
    return;
  }
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
  if (!req.query || !req.query.id || (!req.body || !req.body.joke)) {
    res.status(400);
    res.send("must have joke id and content");
    return;
  }
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
