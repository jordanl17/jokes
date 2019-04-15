import fs from "fs";

const readFile = () =>
  new Promise((resolve, reject) => {
    var data = "";
    var readStream = fs.createReadStream("jokes.csv", "utf8");

    readStream.on("data", chunk => (data += chunk));
    readStream.on("end", () => resolve(csvToJson(data)));
    readStream.on("error", err => reject(err));
  });

const csvToJson = csvContent => csvContent.split("\n");

const updateFile = newContent =>
  new Promise((resolve, reject) =>
    fs.writeFile("jokes.csv", newContent.join("\n"), err => {
      if (err) {
        reject(err);
      }
      resolve();
    })
  );

const addJoke = newJoke =>
  new Promise((resolve, reject) => {
    readFile().then(jokes => {
      jokes.push(newJoke);

      updateFile(jokes)
        .then(() => resolve())
        .catch(err => reject(err));
    });
  });

const getById = id =>
  new Promise(resolve => {
    readFile().then(jokes => {
      const requestedJoke = jokes[id];
      resolve(requestedJoke);
    });
  });

const deleteById = id =>
  new Promise(resolve => {
    readFile().then(jokes => {
      // index is int, id is string, do not type ascert
      const newJokes = jokes.filter((joke, index) => index != id);

      updateFile(newJokes)
        .then(() => resolve())
        .catch(err => reject(err));
    });
  });

const updateById = ({ id, joke }) =>
  new Promise(resolve => {
    readFile().then(jokes => {
      const newJokes = jokes.map((originalJoke, index) =>
        index == id ? joke : originalJoke
      );

      updateFile(newJokes)
        .then(() => resolve())
        .catch(err => reject(err));
    });
  });
export default {
  allJokes: () => readFile(),
  addJoke,
  getById,
  deleteById,
  updateById
};
