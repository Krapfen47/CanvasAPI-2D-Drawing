const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const undoBtn = document.getElementById("undo");
const redoBtn = document.getElementById("redo");

let currentPolygon = [];
let currentStroke = { start: null, end: null };
let undoneStrokes = [];

let finishedPolygons = [];

// initial draw
DrawElements();

function getCurrentPoint(event){
  const rect = canvas.getBoundingClientRect();

  // Mouse position relative to canvas
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  return { x, y };
}

// handle preview
canvas.addEventListener("mousemove", (event) => {
  if (currentStroke.start === null)
    return;

  const { x, y } = getCurrentPoint(event);

  DrawElements([...currentPolygon, { start: currentStroke.start, end: { x, y }}])
});

canvas.addEventListener("dblclick", (event) => {
    currentPolygon = [...currentPolygon, { start: currentStroke.start, end: currentPolygon[0].start }];
    finishedPolygons = [...finishedPolygons, currentPolygon]
    currentPolygon = [];
    currentStroke = { start: null, end: null };

    DrawElements(currentPolygon);
})

// Handle draw
canvas.addEventListener("click", (event) => {
    if (event.detail === 2)
      return;

    const { x, y } = getCurrentPoint(event);

    if (currentStroke.start === null)
    {
        currentStroke.start = { x, y };
        return;
    }

    currentStroke.end = { x, y };
    currentPolygon = [...currentPolygon, currentStroke];
    currentStroke = { start: currentStroke.end, end: null };
    undoneStrokes = [];

    DrawElements(currentPolygon);
});

function DrawElements(elements = currentPolygon) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (elements.length === 0 && finishedPolygons.length === 0) {
    // Draw initial text
    ctx.font = "16px Arial";
    ctx.fillText("Click anywhere on the canvas", canvas.width / 2 - 100, canvas.height / 2);
    return;
  }

  // Start a new Path
  ctx.beginPath();

  finishedPolygons.forEach(polygon => {
    polygon.forEach(element => {
        ctx.moveTo(element.start.x, element.start.y);
        ctx.lineTo(element.end.x, element.end.y);
    })
  });

  elements.forEach(element => {
    ctx.moveTo(element.start.x, element.start.y);
    ctx.lineTo(element.end.x, element.end.y);
  });

  // Draw the Path
  ctx.stroke();
}

undoBtn.addEventListener("click", (event) => {
    if (currentPolygon.length === 0) {
        if (finishedPolygons.length === 0) {
            return;
        }

        currentPolygon = finishedPolygons.splice(-1, 1)[0];
    }

    undoneStrokes = [...undoneStrokes, ...currentPolygon.splice(-1, 1)];
    if (currentPolygon.length > 0) {
        currentStroke.start = currentPolygon[currentPolygon.length - 1].end;
    } else {
        currentStroke.start = null;
    }
    DrawElements(currentPolygon);
})

redoBtn.addEventListener("click", () => {
    if (undoneStrokes.length === 0)
        return;

    currentPolygon = [...currentPolygon, ...undoneStrokes.splice(-1, 1)];
    currentStroke.start = currentPolygon[currentPolygon.length - 1].end;

    if (currentPolygon[currentPolygon.length - 1].end === currentPolygon[0].start) {
        finishedPolygons = [...finishedPolygons, currentPolygon]
        currentPolygon = [];
        currentStroke = { start: null, end: null };
    }

    DrawElements(currentPolygon);
})