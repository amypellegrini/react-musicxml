import React from "react";
import { Stave } from "react-scorewriter";

const ReactMusicXML = ({ xml }: { xml: string }) => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xml, "text/xml");
  const rootElement = xmlDoc.children[0];
  const parts = Array.from(rootElement.getElementsByTagName("part"));

  return (
    <svg>
      {parts.map((part, idx) => {
        const clef = part.children[0].children[0].getElementsByTagName("clef");
        const clefName =
          clef[0].getElementsByTagName("sign")[0].textContent === "G"
            ? "G-clef"
            : "F-clef";

        return <Stave clef={clefName} />;
      })}
    </svg>
  );
};

export default ReactMusicXML;
