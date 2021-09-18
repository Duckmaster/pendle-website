function displayTimetable() {
    getJSON(function(jsonText) {
        var timetableJSON = JSON.parse(jsonText);
        var events = timetableJSON.timetable.events;
        var numEvents =  Object.keys(events).length;
        createTimetableCards(numEvents);
        var timetableDiv = document.getElementById("timetable");
        var row = timetableDiv.children[0];
        var i = 0;
        var cards = row.children;
        for (var card of cards) {
            var body = card.firstChild;
            var title = body.getElementsByTagName("h5")[0];
            title.textContent = events[i].name;
            var date = body.getElementsByTagName("p")[0];
            date.textContent = `Date: ${events[i].date} (${events[i].time}) `;
            var description = body.getElementsByTagName("p")[1];
            description.textContent = events[i].blurb;
            i++;
        }  
    })            
}

function getJSON(cb) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            cb(this.responseText);
        }
    }
    xmlhttp.open("GET", "timetable.json?r="+Math.random());
    xmlhttp.send();
}

function createTimetableCards(numCards) {
    var timetableDiv = document.getElementById("timetable");
    var row = document.createElement("div");
    row.className = "d-flex flex-wrap";
    for (let i = 0; i < numCards; i++) {
        var newCard = createCard();
        row.appendChild(newCard);
    }
    timetableDiv.appendChild(row);
}
function createCard() {
    var newCard = document.createElement("div");
    newCard.className = "card m-2";
    newCard.style = "width: 18rem; border: 3px solid DarkGreen;";
    var cardBody = document.createElement("div");
    cardBody.className = "card-body d-flex flex-column";
    var cardTitle = document.createElement("h5");
    cardTitle.className = "card-title";
    cardTitle.textContent = "Title";
    cardTitle.style = "text-align: center";
    var cardDate = document.createElement("p");
    cardDate.className = "card-text";
    cardDate.textContent = "some date";
    var cardText = document.createElement("p");
    cardText.className = "card-text";
    cardText.textContent = "some text";
    cardText.style = "flex-grow: 1;";
    var cardButton = document.createElement("a");
    cardButton.className = "btn";
    cardButton.textContent = "See more...";
    cardButton.style = "background-color: rgba(0, 100, 0); color: rgba(255, 255, 255);";
    cardButton.setAttribute("onclick", "createModal(this)")

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardDate);
    cardBody.appendChild(cardText);
    cardBody.appendChild(cardButton);
    newCard.appendChild(cardBody);

    return newCard;
}

function filterEvents() {
    var controlsDiv = document.getElementById("controls");
    var daySelect = controlsDiv.getElementsByTagName("select")[0];
    var checkboxes = Array.from(controlsDiv.getElementsByTagName("input"));
    var tickedCheckboxes = checkboxes.filter(cb => cb.checked);
     
    var timetableRow = document.getElementById("timetable").children[0];
    var selectedDay = daySelect.value;

    for (card of timetableRow.children) {
        var date = card.children[0].children[1].textContent;
        var hide = true;
        if (date.includes(selectedDay)) {
            if (tickedCheckboxes.length == 0) {
                hide = false;
            } else {
                for (cb of tickedCheckboxes) {
                    if (date.includes(cb.value)) hide = false;
                }
            }
        } 
        if (hide) {
            card.style["display"] = "none";
        } else {
            card.style["display"] = "";
        }
    }
}

function createModal(cardButton) {
    getJSON(function(jsonText) {
        var eventTitle = cardButton.parentElement.parentElement.children[0].getElementsByTagName("h5")[0].textContent;
        console.log(eventTitle);
        var timetableJSON = JSON.parse(jsonText);
        var events = timetableJSON.timetable.events;
        var modal = document.getElementById("myModal");
        for (var event of events) {
            if (event.name == eventTitle) {
                console.log(events);
                modal.getElementsByTagName("h5")[0].textContent = event.name;
                modal.getElementsByTagName("p")[0].innerHTML = `<b>Time:</b> ${event.p_time}`;
                modal.getElementsByTagName("p")[1].innerHTML = event.description;
                $("#myModal").modal();
            }
        }

    })
}