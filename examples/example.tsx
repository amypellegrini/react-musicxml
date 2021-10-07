import React from "react";
// @ts-ignore
import example from "./example.musicxml";
import ReactMusicXML from "../src";

function Example() {
  return <ReactMusicXML xml={example} />;
}

export default Example;
