import fileService from "../../src/services/fileService";
import fs from "fs";
import { file } from "@babel/types";

jest.mock("fs", () => ({
  createReadStream: jest.fn(() => ({
    on: jest.fn()
  })),
  writeFile: jest.fn()
}));
describe("fileService", () => {
  describe("readFile/allJokes", () => {
    it("should call createReadStream with correct parameters", () => {
      fileService.allJokes();

      expect(fs.createReadStream).toHaveBeenCalledWith("jokes.csv", "utf8");
    });

    it("should listen to 3 events", () => {
      fileService.allJokes();

      console.log(fs.createReadStream.mock.results[1].value.on.mock.calls);
      const readStream = fs.createReadStream.mock.results[1].value;
      expect(readStream.on).toHaveBeenCalledTimes(3);
    });
  });

  describe("getById", () => {
    it("do thing", () => {
      fileService.getById(0);

      console.log(fs.createReadStream.mock.results[1].value.on.mock.calls);
      const readStream = fs.createReadStream.mock.results[1].value;

      const onEnd = readStream.on.mock.calls[0][1];
      onEnd(['first', 'second']);
      expect(fs.writeFile).toHaveBeenCalledWith("jokes.csv", "");
    });
  });
});
