type Tree = {
  [key: string]: Node;
};

type Node = {
  attributes?: {
    [key: string]: String;
  };
  children?: Tree[];
  value?: String;
};

function processChildren(xmlString: string, parentNode: Tree, tag: string) {
  const parentTagKey = Object.keys(parentNode)[0];

  const innerContentStartIndex = xmlString.match(">").index + 1;
  const innerContentEndIndex = xmlString.match(`</${tag}`).index;

  let innerContent = xmlString.substring(
    innerContentStartIndex,
    innerContentEndIndex
  );

  if (innerContent.match("<") === null) {
    parentNode[parentTagKey].value = innerContent;
    return;
  }

  while (innerContent !== "") {
    const attributes = innerContent
      .substring(0, innerContent.match(">").index)
      .trim()
      .split(" ");
    const child: Tree = {};

    const childTag = attributes[0].substring(1);

    const key = attributes[0]
      .substring(1)
      .split("-")
      .map((part, i) => {
        if (i > 0) {
          return `${part.charAt(0).toUpperCase()}${part.slice(1)}`;
        }

        return part;
      })
      .join("");

    child[key] = {};

    if (attributes.length > 1) {
      child[key].attributes = {};

      for (let i = 1; i < attributes.length; i++) {
        const keyValueTuple = attributes[i].split("=");
        child[key].attributes[keyValueTuple[0]] = keyValueTuple[1].replace(
          /"/g,
          ""
        );
      }
    }

    processChildren(innerContent, child, childTag);

    innerContent = innerContent
      .trim()
      .substring(
        innerContent.match(`</${childTag}`).index + childTag.length + 3
      );

    if (!parentNode[parentTagKey].children) {
      parentNode[parentTagKey].children = [];
    }

    parentNode[parentTagKey].children.push(child);
  }
}

export default function parse(xml: string): Object {
  let processedString = xml;
  let rootNode: Tree = {};

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
    rootNode.scorePartwise = {};

    const tagEndIndex = processedString.match(">").index;
    const attributes = processedString.substring(0, tagEndIndex).split(" ");

    if (attributes.length > 1) {
      rootNode.scorePartwise.attributes = {};

      for (let i = 1; i < attributes.length; i++) {
        const keyValueTuple = attributes[i].split("=");

        rootNode.scorePartwise.attributes[keyValueTuple[0]] =
          keyValueTuple[1].replace(/"/g, "");
      }
    }

    processChildren(processedString, rootNode, "score-partwise");
  } else {
    // throw some error here?
  }

  return rootNode;
}
