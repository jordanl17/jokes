import express from "express";
import bodyParser from "body-parser";

import randomJokeController from "./controllers/randomJokeController";
import jokeController from "./controllers/jokeController";

const app = express();
app.use(bodyParser.json());

app.get("/randomJoke", randomJokeController);

// new joke
app.post("/joke", jokeController.add);

// joke by id
// app.get("/joke:id");

// // delete by id
// app.delete("/joke:id",);

// // update by id
// app.post("/joke:id", );

const start = () => {
  app.listen(3050, function() {
    console.log("Example app listening on port 3050.");
  });
};

export default { start };
