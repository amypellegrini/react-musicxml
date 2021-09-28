import React from "react";
import { Staff, Clef } from "react-scorewriter";

const ReactMusicXML = ({ content }: { content: string }) => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(content, "text/xml");
  const rootElement = xmlDoc.children[0];
  const parts = Array.from(rootElement.getElementsByTagName("part"));

  return (
    <svg>
      {parts.map((part, idx) => {
        const clef = part.children[0].children[0].getElementsByTagName("clef");
        const clefType =
          clef[0].getElementsByTagName("sign")[0].textContent === "G"
            ? "G-clef"
            : "F-clef";

        return (
          <>
            <Clef name={clefType} />
            <Staff key={idx} />
          </>
        );
      })}
    </svg>
  );
};

export default ReactMusicXML;
