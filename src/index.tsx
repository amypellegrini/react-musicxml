import React from "react";

const ReactMusicXML = ({ content }: { content: string }) => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(content, "text/xml");

  console.log(xmlDoc);

  return <></>;
};

export default ReactMusicXML;
