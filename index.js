let topPositionNote = 37;
let leftPositionNote = 30;
let noteNamesMap = new Map();
noteNamesMap.set('c2', '45');
noteNamesMap.set('d2', '40');
noteNamesMap.set('e2', '35');
noteNamesMap.set('f2', '30');
noteNamesMap.set('g2', '25');
noteNamesMap.set('a2', '20');
noteNamesMap.set('b2', '15');
let notesTime = new Map();
notesTime.set('1', 'images/whole-note.png');
notesTime.set('1/1', 'images/whole-note.png');
notesTime.set('1/2', 'images/half-note.png');
notesTime.set('1/4', 'images/quarter-note.png');
notesTime.set('1/8', 'images/eighth-note.png');
notesTime.set('1/16', 'images/sixteenth-note.png');
let canvasArea =  `<canvas id="c" width="600" height="200"></canvas>`;
let body =  document.querySelector('body')
body.innerHTML=canvasArea;
let canvas = new fabric.Canvas('c');
let width = canvas.width;
let height =canvas.height;
function createLine() {
    let lineFirst = new fabric.Rect({
        left: 10,
        top: 20,
        fill: '#1A1A17',
        width: width-50,
        height: 1
    });

    let lineSecond = new fabric.Rect({
        left: 10,
        top: 30,
        fill: '#1A1A17',
        width: width-50,
        height: 1
    });
    let lineThird = new fabric.Rect({
        left: 10,
        top: 40,
        fill: '#1A1A17',
        width: width-50,
        height: 1
    });
    let lineFour = new fabric.Rect({
        left: 10,
        top: 50,
        fill: '#1A1A17',
        width: width-50,
        height: 1
    });
    let lineFive = new fabric.Rect({
        left: 10,
        top: 60,
        fill: '#1A1A17',
        width: width-50,
        height: 1
    });
    canvas.add(lineFirst, lineSecond, lineThird, lineFour, lineFive);
}

async function fetchSendPost() {
    const rawResponse = await fetch('data.json');
    let json = await rawResponse.json();
    return json;
}

function drawNotesList(elements) {
    let countDistance = 0;
    elements.forEach(element => {
        let keyImage = element.time;
        let keyNote = element.note;

        let noteTime = notesTime.has(keyImage);
        let noteName = noteNamesMap.has(keyNote);
        if (noteTime && noteName) {
            let src = notesTime.get(keyImage);
            let top = noteNamesMap.get(keyNote);
            countDistance += 35;
            (function (top, countDistance) {
                fabric.Image.fromURL(src, function (imageNote) {
                    imageNote.on('mousedown', function () {
                        canvas.remove(this);
                    });
                    let imgNote = imageNote.set({left: leftPositionNote + countDistance, top: +top});
                    canvas.add(imgNote);
                })
            })(top, countDistance);
        }
    })
};

fetchSendPost()
    .then(
        createLine())
.then(dataJson => {
    drawNotesList(dataJson);
}
)
;

createLine();

