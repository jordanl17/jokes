import randomJokeController from "../../src/controllers/randomJokeController";
import fileService from "../../src/services/fileService";

describe("randomJokeController", () => {
  let res = undefined;
  beforeEach(() => {
    res = {
      send: jest.fn(),
      status: jest.fn()
    };
  });
  it("successful file read - should return success status", done => {
    jest
      .spyOn(fileService, "allJokes")
      .mockImplementation(() => Promise.resolve(["first", "second"]));

    randomJokeController({}, res);

    setTimeout(() => {
      expect(res.status).toHaveBeenCalledWith(200);
      done();
    }, 1000);
  });

  it("failure file read - should return error code and message", done => {
    jest
      .spyOn(fileService, "allJokes")
      .mockImplementation(() => Promise.reject("some error"));
    randomJokeController({}, res);

    setTimeout(() => {
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith("some error");
      done();
    }, 1000);
  });
});
