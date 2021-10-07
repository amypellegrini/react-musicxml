import parse from "../parse";
import jsonFixture from "./fixture.json";
import fs from "fs";

describe("parser", () => {
  it("parses xml string input and returns a JSON object", () => {
    const xml = fs.readFileSync(__dirname + "/fixture.musicxml", "utf8");
    console.log(JSON.stringify(parse(xml), null, 2));
    expect(parse(xml)).toEqual(jsonFixture);
  });
});
