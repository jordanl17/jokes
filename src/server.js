import express from "express";
import bodyParser from "body-parser";

import randomJokeController from "./controllers/randomJokeController";
import jokeController from "./controllers/jokeController";

const app = express();
app.use(bodyParser.json());

app.get("/randomJoke", randomJokeController);

/******* jokes */
// all jokes
app.get("/jokes", jokeController.all)
// new joke
app.post("/joke", jokeController.add);
// joke by id
app.get("/joke", jokeController.get);
// delete by id
app.delete("/joke", jokeController.remove);
// update by id
app.patch("/joke", jokeController.update);

/****** filters */

const start = () => {
  app.listen(3050, function() {
    console.log("Example app listening on port 3050.");
  });
};

export default { start };
