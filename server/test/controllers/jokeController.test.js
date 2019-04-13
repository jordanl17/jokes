import controller from "../../src/controllers/jokeController";
import fileService from "../../src/services/fileService";

describe("jokeController", () => {
  let res = undefined;

  beforeEach(() => {
    res = {
      send: jest.fn(),
      status: jest.fn(),
      sendStatus: jest.fn()
    };
  });

  describe("all", () => {
    it("success - should return all jokes", done => {
      jest
        .spyOn(fileService, "allJokes")
        .mockImplementation(() => Promise.resolve(["first", "second"]));

      controller.all({}, res);
      setTimeout(() => {
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(["first", "second"]);
        done();
      }, 1000);
    });

    it("failure - should return correct error", done => {
      jest
        .spyOn(fileService, "allJokes")
        .mockImplementation(() => Promise.reject("test error"));

      controller.all({}, res);
      setTimeout(() => {
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith("test error");
        done();
      }, 1000);
    });
  });

  describe("add", () => {
    let req = undefined;

    beforeEach(() => {
      req = {
        body: {
          joke: "new test joke"
        }
      };
    });

    it("failure due to incorrect request - should set correct status and error message", () => {
      controller.add({}, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith("must have joke body");
    });

    it("success - should set correct status", done => {
      jest
        .spyOn(fileService, "addJoke")
        .mockImplementation(() => Promise.resolve());

      controller.add(req, res);
      setTimeout(() => {
        expect(res.sendStatus).toHaveBeenCalledWith(200);
        done();
      }, 1000);
    });

    it("failure - should return correct error", done => {
      jest
        .spyOn(fileService, "addJoke")
        .mockImplementation(() => Promise.reject("test error"));

      controller.add(req, res);
      setTimeout(() => {
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith("test error");
        done();
      }, 1000);
    });
  });

  describe("get", () => {
    let req = undefined;

    beforeEach(() => {
      req = {
        query: {
          id: "test id"
        }
      };
    });

    it("failure due to incorrect request - should set correct status and error message", () => {
      controller.get({}, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith("must have joke id");
    });

    it("success - should set correct status", done => {
      jest
        .spyOn(fileService, "getById")
        .mockImplementation(() => Promise.resolve("joke by id"));

      controller.get(req, res);
      setTimeout(() => {
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith("joke by id");
        done();
      }, 1000);
    });

    it("failure - should return correct error", done => {
      jest
        .spyOn(fileService, "getById")
        .mockImplementation(() => Promise.reject("test error"));

      controller.get(req, res);
      setTimeout(() => {
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith("test error");
        done();
      }, 1000);
    });
  });

  describe("remove", () => {
    let req = undefined;

    beforeEach(() => {
      req = {
        query: {
          id: "test id"
        }
      };
    });

    it("failure due to incorrect request - should set correct status and error message", () => {
      controller.remove({}, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith("must have joke id");
    });

    it("success - should set correct status", done => {
      jest
        .spyOn(fileService, "deleteById")
        .mockImplementation(() => Promise.resolve("joke by id"));

      controller.remove(req, res);
      setTimeout(() => {
        expect(res.sendStatus).toHaveBeenCalledWith(200);
        done();
      }, 1000);
    });

    it("failure - should return correct error", done => {
      jest
        .spyOn(fileService, "deleteById")
        .mockImplementation(() => Promise.reject("test error"));

      controller.remove(req, res);
      setTimeout(() => {
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith("test error");
        done();
      }, 1000);
    });
  });

  describe("update", () => {
    let req = undefined;

    beforeEach(() => {
      req = {
        query: {
          id: "test id"
        },
        body: {
          joke: "new test joke"
        }
      };
    });

    it("failure due to incorrect request - should set correct status and error message", () => {
      controller.update({}, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith("must have joke id and content");
    });

    it("success - should set correct status", done => {
      jest
        .spyOn(fileService, "updateById")
        .mockImplementation(() => Promise.resolve("joke by id"));

      controller.update(req, res);
      setTimeout(() => {
        expect(res.sendStatus).toHaveBeenCalledWith(200);
        done();
      }, 1000);
    });

    it("failure - should return correct error", done => {
      jest
        .spyOn(fileService, "updateById")
        .mockImplementation(() => Promise.reject("test error"));

      controller.update(req, res);
      setTimeout(() => {
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith("test error");
        done();
      }, 1000);
    });
  });
});
