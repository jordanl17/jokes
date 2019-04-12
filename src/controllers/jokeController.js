import fileService from "../services/fileService";

const add = (req, res) => {
  console.log(req.body);
  const { joke: newJoke } = req.body;
  fileService.addJoke(newJoke).then(() => res.sendStatus(200));
};

export default { add };
