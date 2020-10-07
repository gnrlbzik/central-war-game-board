import Two from "two.js";

// Make an instance of two and place it on the page.
const canvasElem = document.getElementById("canvas") as HTMLElement;
const canvasParams = { width: 1300, height: 1300 };
const two = new Two(canvasParams).appendTo(canvasElem);

const controlsElem = document.getElementById("controls") as HTMLElement;

const controlsButtonElem = controlsElem.getElementsByTagName(
  "button"
)[0] as HTMLElement;
const controlsSelectElem = controlsElem.getElementsByTagName(
  "select"
)[0] as HTMLElement;

controlsButtonElem.addEventListener("click", (e) => {
  const selectedOptions =
    controlsSelectElem.options[controlsSelectElem.selectedIndex].value;

  const { width: mapWidth, height: mapHeight } = two;

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  switch (selectedOptions) {
    case "oval":
      const oval = two.makeEllipse(
        getRandomInt(mapWidth),
        getRandomInt(mapHeight),
        60,
        20
      );
      oval.fill = "grey";
      oval.stroke = "black";
      oval.linewidth = 2;
      break;
    case "square":
      const square = two.makeRectangle(
        getRandomInt(mapWidth),
        getRandomInt(mapHeight),
        40,
        40
      );
      square.fill = "grey";
      square.stroke = "black";
      square.linewidth = 2;
      break;
    case "circle":
      const circle = two.makeCircle(
        getRandomInt(mapWidth),
        getRandomInt(mapHeight),
        20
      );
      circle.fill = "grey";
      circle.stroke = "black";
      circle.linewidth = 2;
      break;
    case "triangle":
      const triangle = two.makePolygon(
        getRandomInt(mapWidth),
        getRandomInt(mapHeight),
        20,
        3
      );
      triangle.fill = "grey";
      triangle.stroke = "black";
      triangle.linewidth = 2;
      break;
    default:
      break;
  }
  two.update();
});

// function PointCoords(horizontal: number, vertical: number) {
//   return [horizontal, vertical];
// }

const enum EastingNorthingSegmentLength {
  "HUNDRED_THOUSANDS" = 100000,
  "TEN_THOUSANDS" = 10000,
  "ONE_THOUSAND" = 1000,
  "ONE_HUNDRED" = 100
}

const OPTIONS = {
  eastingNorthingSegmentLength: EastingNorthingSegmentLength.ONE_HUNDRED,
  numberOfEastings: 10,
  numberOfNorthings: 10,
  gridPadding: 50
};

// function PaintProvidedMap(
//   scale: number,
//   eastingsOffset: number,
//   northingsOffset: number
// ) {}

function CalculateGrid(
  eastingNorthingSegmentLength: EastingNorthingSegmentLength = EastingNorthingSegmentLength.TEN_THOUSANDS,
  numberOfEastings: number,
  numberOfNorthings: number
) {
  const { width: mapWidth, height: mapHeight } = two;

  const northings = [...Array(numberOfNorthings).keys()].map((northing) => {
    const verticalSpacing = eastingNorthingSegmentLength * (northing + 1);
    return [
      0 + OPTIONS.gridPadding,
      verticalSpacing + OPTIONS.gridPadding,
      mapWidth - OPTIONS.gridPadding,
      verticalSpacing + OPTIONS.gridPadding
    ];
  });

  const eastings = [...Array(numberOfEastings).keys()].map((easting) => {
    const horisontalSpacing = eastingNorthingSegmentLength * (easting + 1);
    return [
      horisontalSpacing + OPTIONS.gridPadding,
      0 + OPTIONS.gridPadding,
      horisontalSpacing + OPTIONS.gridPadding,
      mapHeight - OPTIONS.gridPadding
    ];
  });

  return {
    lines: {
      northings,
      eastings
    }
  };
}

function PaintGridLine(
  lineCoordinates: Array<number>,
  index: number
  // paintThickerLine: boolean = false
) {
  const line = two.makeLine(
    lineCoordinates[0],
    lineCoordinates[1],
    lineCoordinates[2],
    lineCoordinates[3]
  );
  const lineWidth = 0.5;
  const paintThickerLine = (index + 1) % 5 === 0; // TODO: this should be passed in
  line.linewidth = paintThickerLine ? lineWidth * 3 : lineWidth;
  line.stroke = "grey";
  return line;
}

// function PaintTextLineGroup() {}

function PaintGridLines(
  northings: Array<Array<number>>,
  eastings: Array<Array<number>>
) {
  const paintedLines = {
    northings: northings.map(PaintGridLine), // PaintTextLineGroup
    eastings: eastings.map(PaintGridLine) // PaintTextLineGroup
  };

  return paintedLines;
}
// function PaintGridChrome() {}

const calculatedGrid = CalculateGrid(
  OPTIONS.eastingNorthingSegmentLength,
  OPTIONS.numberOfEastings,
  OPTIONS.numberOfNorthings
);
const paintedGridRefs = PaintGridLines(
  calculatedGrid.lines.northings,
  calculatedGrid.lines.eastings
);

// console.log("paintedGridRefs", paintedGridRefs);

// console.log("mapGrid", mapGrid.lines.latitude[0]);
// console.log("mapGrid", ...[].concat(mapGrid.lines.latitude[0]));

// function GenerateGridLines() {}

// const gridLines = GenerateGridLines();

// const coordinatss = ...[].concat(mapGrid.lines.latitude[0]);

// Don't forget to tell two to render everything
// to the screen
two.update();
