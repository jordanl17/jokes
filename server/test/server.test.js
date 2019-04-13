import express from "express";

import server from "../src/server";

import randomJokeController from "../src/controllers/randomJokeController";
import jokeController from "../src/controllers/jokeController";

jest.mock("express", () =>
  jest.fn(() => ({
    use: jest.fn(),
    get: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
    post: jest.fn(),
    listen: jest.fn()
  }))
);

jest.mock("../src/controllers/randomJokeController", () => jest.fn());

jest.mock("../src/controllers/jokeController", () => ({
  all: jest.fn(),
  add: jest.fn()
}));

describe("server", () => {
  beforeEach(() => server.start());

  it("should create express server", () => {
    expect(express).toHaveBeenCalled();
  });

  describe("endpoints", () => {
    let app = undefined;
    beforeEach(() => {
      app = express.mock.results[0].value;
    });

    it("get randomJoke should be instantiated", () => {
      expect(app.get).toHaveBeenCalledWith("/randomJoke", randomJokeController);
    });

    it("get jokes should be instantiated", () => {
      expect(app.get).toHaveBeenCalledWith("/jokes", jokeController.all);
    });

    it("post new joke should be instantiated", () => {
      expect(app.post).toHaveBeenCalledWith("/joke", jokeController.add);
    });

    it("get joke by id should be instantiated", () => {
      expect(app.get).toHaveBeenCalledWith("/joke", jokeController.get);
    });

    it("delete joke by id should be instantiated", () => {
      expect(app.delete).toHaveBeenCalledWith("/joke", jokeController.remove);
    });

    it("update joke by id should be instantiated", () => {
      expect(app.patch).toHaveBeenCalledWith("/joke", jokeController.update);
    });
  });
});
