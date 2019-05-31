# React MusicXML
MusicXML sheet music renderer for React

## Purpose

The purpose of this project is to provide a straight forward solution to generate and render sheet music in the context of React applications using MusicXML files as input source or directly by creating instances of musical symbols imported as React components.

## Audience

This library is tarteted to React developers, software engineers, product owners, and any person interested in the production of rich UIs for musical web applications.

## Intended usage

An example of its usage would be roughly as follows:

### Rendering MusicXML files:

```javascript
import React from 'react';
import ReactMusicXML, { fileLoader, musicXmlParser } form 'react-musicxml';

const SheetMusicExample = async ({ sourceFileURL }: { sourceFileURL: string }) => {
  const musicXmlContent = await fileLoader(sourceFileURL);

  return <ReactMusicXML content={musicXmlParser(musicXmlContent)} />
}

export default SheetMusicExample;
```

### Rendering musical symbols:

```javascript
import React from 'react';
import {
  SheetMusicLayout,
  TimeSignature,
  KeySignature,
  Staff,
  Clef
 } form 'react-musicxml';
 
const SheetMusicExample = () => {
  return (
    <SheetMusicLayout>    
      <Staff>
        <Clef name="F-clef" />
        <KeySignature fifths={-2}>
        <TimeSignature beats={2} timeUnit={4} />
      </Staff>
    </SheetMusicLayout>
  );
}

export default SheetMusicExample;
```

Another possibility is to implement a solution which exposes MusicXML compatible syntax, pretty much in the way that the React/JSX combo mimcs HTML syntax:

```javascript
const SheetMusicExample = () => {
  return (
    <score-partwise version="3.1">
      <part-list>
        <score-part id="P1">
          <part-name>Piano</part-name>
          <part-abbreviation>Pno.</part-abbreviation>
          <score-instrument id="P1-I1">
            <instrument-name>Piano</instrument-name>
            </score-instrument>
          </score-part>
        </part-list>
      <part id="P1">
        <measure number="1" width="292.91">
          <attributes>
            <divisions>1</divisions>
            <key>
              <fifths>0</fifths>
              </key>
            <time>
              <beats>4</beats>
              <beat-type>4</beat-type>
              </time>
            <staves>2</staves>
            <clef number="1">
              <sign>G</sign>
              <line>2</line>
              </clef>
            <clef number="2">
              <sign>F</sign>
              <line>4</line>
              </clef>
            </attributes>
          <note default-x="86.27" default-y="-50.00">
            <pitch>
              <step>C</step>
              <octave>4</octave>
              </pitch>
            <duration>4</duration>
            <voice>1</voice>
            <type>whole</type>
            <staff>1</staff>
            </note>
          <backup>
            <duration>4</duration>
            </backup>
          <note>
            <rest/>
            <duration>4</duration>
            <voice>5</voice>
            <staff>2</staff>
          </note>
          <barline location="right">
            <bar-style>light-heavy</bar-style>
          </barline>
        </measure>
      </part>
    </score-partwise>
  );
}
```


### Note:

Please note that this library is in its Alpha stage so the above examples are purely speculative and no stable API has been deviced yet, so these examples are subject to change.

## Benefits

### Customization and flexibility

On top of being an easy-to-go solution to render MusicXML files, having the felxibility to manipulate musical symbols individually allows further customization of the rendering process, layout, and composition, enabling developers to attend specific needs they may have in order to produce the result they expect to produce, regardless of the specifics of this or any other particular renderer. This makes MusicXML a very flexible and unobtrusive tool for the creation of musical web applications.

## Summary / conclusion

There is enough resources and momentum around the React.js ecosystem to provide a valid use case for this project, so any kind of contribution is welcomed as the efforts will be most surely rewarded.
