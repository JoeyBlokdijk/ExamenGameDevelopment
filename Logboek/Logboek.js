
getLogboek();
makeInputAbove();

function makeInputAbove() {
    let madeDiv = document.querySelector(".placeForInputField");
    let dateAndDayDiv = generateDivByClass("Div");
    dateAndDayDiv.setAttribute("class", "DateAndDayWrapper");
    madeDiv.appendChild(dateAndDayDiv);
    let dateField = generateDivByClass("input");
    dateField.setAttribute("id", "dateInputField");
    dateField.setAttribute("type", "date");
    dateAndDayDiv.appendChild(dateField);

    let dayField = generateElement("input", "input");
    dayField.setAttribute("id", "dagenLijst");
    dayField.setAttribute("list", "dagenlijst");
    dayField.setAttribute("placeholder", "Kies een dag");

    let dataList = generateElement("datalist");
    dataList.id = "dagenlijst";

    ["Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag", "Zondag"].forEach(dag => {
        let option = generateDivByClass("option");
        option.value = dag;
        dataList.appendChild(option);
    });
    dateAndDayDiv.appendChild(dataList);
    dateAndDayDiv.appendChild(dayField);

    let noteField = generateDivByClass("div");
    noteField.setAttribute("class", "noteInputFieldWrapper");
    madeDiv.appendChild(noteField);
    let noteInputField = generateDivByClass("textarea");
    noteInputField.setAttribute("id", "NoteField");
    noteInputField.setAttribute("type", "text");
    noteField.appendChild(noteInputField);

    let confirmButton = generateDivByClass("a");
    confirmButton.setAttribute("class", "primaryButton");
    confirmButton.textContent = "Toevoegen";
    confirmButton.addEventListener("click", function () {
        let sendingNote = noteInputField.value;
        let dayFieldValue = dayField.value;
        let dateFieldValue = dateField.value;
        sendNote(sendingNote, dayFieldValue, dateFieldValue);
    });
    madeDiv.appendChild(confirmButton);
}

function sendNote(note, day, date) {
    console.log(note);
    console.log(day);
    console.log(date);
    let xmlHttp = new XMLHttpRequest();
    let url = "sendNote.php";
    xmlHttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let Result = JSON.parse(xmlHttp.responseText);
            console.log(Result);
        }
    };

    let data = {
        note: encodeURIComponent(note),
        day: encodeURIComponent(day),
        date: encodeURIComponent(date)
    };
    xmlHttp.open("POST", url, true);
    xmlHttp.setRequestHeader("Content-type", "application/json");
    xmlHttp.send(JSON.stringify(data));
    location.reload();
}

function getLogboek() {
    let xmlHttp = new XMLHttpRequest();
    let url = "getLogboek.php";

    xmlHttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                try {
                    let result = JSON.parse(this.responseText);
                    console.log(result);
                    result.forEach(entry => loadAllNotes(entry));
                } catch (e) {
                    console.error("JSON Parse Error:", e);
                    console.log("Server Response:", this.responseText);
                }
            } else {
                console.error("Server error:", this.status, this.responseText);
            }
        }
    };
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
}


function loadAllNotes(Notes) {
    let day = Notes.dag;
    let date = Notes.datum;
    if (date) {
        date = formatNederlandsDatum(date)
    }
    let note = Notes.notitie;
    let decodedNote = decodeURIComponent(note);
    let decodedDate = decodeURIComponent(date);
    let decodedDay = decodeURIComponent(day);
    console.log(Notes);
    let madeDiv = document.querySelector(".placeForEveryThing");
    let madeDivRowAround = generateDivByClass("Div");
    madeDivRowAround.setAttribute("class", "DivAround");
    madeDiv.appendChild(madeDivRowAround);
    let madeDivRow = generateDivByClass("Div");
    madeDivRow.setAttribute("class", "InnerDivRowClass");
    madeDivRowAround.appendChild(madeDivRow);
    let informationText = document.createElement("a");
    informationText.innerHTML = decodedDay;
    madeDivRow.appendChild(informationText);
    let informationTextdate = document.createElement("a");
    informationTextdate.innerHTML = decodedDate;
    madeDivRow.appendChild(informationTextdate);
    let noteDivRow = generateDivByClass("Div");
    noteDivRow.setAttribute("class", "NoteDiv");
    madeDivRowAround.appendChild(noteDivRow);
    let informationTextnote = document.createElement("a");
    informationTextnote.innerHTML = decodedNote;
    noteDivRow.appendChild(informationTextnote);
}

function generateDivByClass(className) {
    return document.createElement(className);
}

function generateElement(tag, className = "") {
    const el = document.createElement(tag);
    if (className) el.className = className;
    return el;
}

function formatNederlandsDatum(datum) {
    let parts = datum.split('-');
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
}