export type NodeType =
  | "Clef"
  | "Sign"
  | "Attributes"
  | "Note"
  | "Key"
  | "Pitch"
  | "PartList"
  | "PartName"
  | "Divisions"
  | "Fifths"
  | "Beats"
  | "BeatType"
  | "PartList"
  | "ScorePart"
  | "Time"
  | "Octave"
  | "ScorePartwise";

export type Node = {
  type: NodeType;
  attributes?: {
    [key: string]: String;
  };
  children?: Node[];
  value?: String;
};

function processChildren(xmlString: string, parentNode: Node, tag: string) {
  const parentTagKey = Object.keys(parentNode)[0];

  const innerContentStartIndex = xmlString.match(">").index + 1;
  const innerContentEndIndex = xmlString.match(`</${tag}`).index;

  let innerContent = xmlString.substring(
    innerContentStartIndex,
    innerContentEndIndex
  );

  if (innerContent.match("<") === null) {
    parentNode.value = innerContent;
    return;
  }

  while (innerContent !== "") {
    const attributes = innerContent
      .substring(0, innerContent.match(">").index)
      .trim()
      .split(" ");

    const childTag = attributes[0].substring(1);

    const nodeType = attributes[0]
      .substring(1)
      .split("-")
      .map((part, i) => {
        return `${part.charAt(0).toUpperCase()}${part.slice(1)}`;
      })
      .join("");

    const child: Node = {
      type: nodeType as NodeType,
    };

    if (attributes.length > 1) {
      child.attributes = {};

      for (let i = 1; i < attributes.length; i++) {
        const keyValueTuple = attributes[i].split("=");
        child.attributes[keyValueTuple[0]] = keyValueTuple[1].replace(/"/g, "");
      }
    }

    processChildren(innerContent, child, childTag);

    innerContent = innerContent
      .trim()
      .substring(
        innerContent.match(`</${childTag}`).index + childTag.length + 3
      );

    if (!parentNode.children) {
      parentNode.children = [];
    }

    parentNode.children.push(child);
  }
}

export default function parse(xml: string): Node {
  let processedString = xml;

  // TODO: some validation can be added here
  if (processedString.match("<?xml") !== null) {
    let tagsConsumed = 0;

    // remove the xml and DTD tags from the beginning of the string
    for (let i = 0; i < xml.length; i++) {
      if (xml[i] === ">") {
        processedString = xml.substring(i + 1);
        tagsConsumed += 1;
      }

      if (tagsConsumed === 2) {
        break;
      }
    }
  }

  if (processedString.match("score-partwise") !== null) {
    const rootNode: Node = {
      type: "ScorePartwise",
    };

    const tagEndIndex = processedString.match(">").index;
    const attributes = processedString.substring(0, tagEndIndex).split(" ");

    if (attributes.length > 1) {
      rootNode.attributes = {};

      for (let i = 1; i < attributes.length; i++) {
        const keyValueTuple = attributes[i].split("=");

        rootNode.attributes[keyValueTuple[0]] = keyValueTuple[1].replace(
          /"/g,
          ""
        );
      }
    }

    processChildren(processedString, rootNode, "score-partwise");

    return rootNode;
  } else {
    // throw some error here?
  }
}
