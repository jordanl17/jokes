import fs from "fs";

const readFile = () =>
  new Promise((resolve, reject) => {
    var data = "";
    var readStream = fs.createReadStream("jokes.csv", "utf8");
    readStream
      .on("data", chunk => (data += chunk))
      .on("end", () => resolve(csvToJson(data)))
      .on("error", err => reject(err));
  });

const csvToJson = csvContent => csvContent.split("\n");

const addJoke = newJoke =>
  new Promise((resolve, reject) => {
    readFile().then(jokes => {
      jokes.push(newJoke);

      fs.writeFile("jokes.csv", jokes.join("\n"), err => {
        if (err) {
          reject(err);
        }
        resolve();
      });
    });
  });

export default { allJokes: () => readFile(), addJoke };
