import React from "react";
import parse, { Node, NodeType } from "./parse";
import { Stave } from "react-scorewriter";

const ReactMusicXML = ({ xml }: { xml: string }) => {
  const parsed: Node = parse(xml);
  return (
    <svg height="200" viewBox="0 -50 300 200">
      {parsed.children.map((child, idx) => {
        if (child.type === ("Part" as NodeType)) {
          return <Stave key={idx} clef="G-clef" />;
        }
      })}
    </svg>
  );
};

export default ReactMusicXML;
