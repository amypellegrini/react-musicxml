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

Another possibility is to implement a solution which exposes MusicXML compatible syntax, pretty much in the way that the React/JSX combo mimcs HTML syntax.

The following example was taken from a `.musicxml` file produced with Musescore and adapted to match React/JSX compatible sytnax:

```javascript
const SheetMusicExample = () => {
  return (
    <ScorePartwise>
      <PartList>
        <ScorePart>
          <PartName>Piano</PartName>
          <PartAbbreviation>Pno.</PartAbbreviation>
          <Score-instrument>
            <instrumentName>Piano</instrumentName>
          </Score-instrument>
        </ScorePart>
      </PartList>
      <Part>
        <Measure number={1}>
          <Attributes>
            <Divisions>1</Divisions>
            <Key>
              <Fifths>0</Fifths>
            </Key>
            <Time>
              <Beats>4</Beats>
              <Beat-type>4</Beat-type>
            </Time>
            <Staves>2</Staves>
            <Clef number={1}>
              <Sign>G</Sign>
              <Line>2</Line>
            </Clef>
            <Clef number={2}>
              <Sign>F</Sign>
              <Line>4</Line>
            </Clef>
          </Attributes>
          <Note>
            <Pitch>
              <Step>C</Step>
              <Octave>4</Octave>
            </Pitch>
            <Duration>4</Duration>
            <Voice>1</Voice>
            <Type>whole</Type>
            <Staff>1</Staff>
          </Note>
          <Backup>
            <Duration>4</Duration>
          </Backup>
          <Note>
            <Rest />
            <Duration>4</Duration>
            <Voice>5</Voice>
            <Staff>2</Staff>
          </Note>
          <Barline location="right">
            <BarStyle>light-heavy</BarStyle>
          </Barline>
        </Measure>
      </Part>
    </ScorePartwise>
  );
};
```

### Note:

Please note that this library is in its Alpha stage so the above examples are purely speculative and no stable API has been deviced yet, so these examples are subject to change.

## Benefits

### Customization and flexibility

On top of being an easy-to-go solution to render MusicXML files, having the felxibility to manipulate musical symbols individually allows further customization of the rendering process, layout, and composition, enabling developers to attend specific needs they may have in order to produce the result they expect to produce, regardless of the specifics of this or any other particular renderer. This makes MusicXML a very flexible and unobtrusive tool for the creation of musical web applications.

## Summary / conclusion

There is enough resources and momentum around the React.js ecosystem to provide a valid use case for this project, so any kind of contribution is welcomed as the efforts will be most surely rewarded.
