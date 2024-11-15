let data;
let divActivity;
let divWheel;
let topics;
let wheel;

function preload() {
    data = loadJSON("./ConversationTopics.json");
}

function setup() {
    topics = data.topics;
    divActivity = document.getElementById("activity");
    document.getElementById("title").innerText = data.activityName;
    document.getElementById("selActivity").onchange = (e) => {
        divActivity.innerHTML = "";
        setActivity(e.target.value);
    }
    divWheel = setCanvas();
}

function draw() {
    background(0);
    if (wheel) {
        wheel.show();
    }
}

function setActivity(type) {
    wheel = undefined;
    divWheel.hidden = true;
    switch (type) {
        case 'list':
            listTopics();
            break;
        case 'random':
            randomTopic();
            break;
        case 'wheel':
            wheelTopic();
            break;
    }
}

function listTopics() {
    topics = data.topics;
    let row = document.createElement("div");
    row.className = "row my-1";
    divActivity.appendChild(row);
    let col = document.createElement("div");
    col.className = "col";
    row.appendChild(col);
    let lg = document.createElement("div");
    lg.className = "list-group";
    col.appendChild(lg);
    for (const topic of topics) {
        let btn = document.createElement("button");
        btn.className = "list-group-item list-group-item-action";
        btn.type = "button";
        btn.textContent = topic.topicTitle;
        btn.value = data.topics.indexOf(topic);
        btn.onclick = () => {
            divActivity.innerHTML = "";
            setTopic(data.topics[btn.value]);
        }
        lg.appendChild(btn);
    }
}

function setCustomBar() {
    let row = document.createElement("div");
    row.className = "row my-1 mx-auto";
    divActivity.appendChild(row);
    let col = document.createElement("div");
    col.className = "col-auto mx-auto";
    row.appendChild(col);
    let btnGroup = document.createElement("div");
    btnGroup.className = "btn-group";
    col.appendChild(btnGroup);
    let btnList = document.createElement("button");
    btnList.className = "btn btn-secondary";
    btnList.textContent = "Change topics list";
    btnList.onclick = () => {
        divActivity.innerHTML = "";
        customList();
    };
    btnGroup.appendChild(btnList);
    return btnGroup;
}

function randomTopic() {
    let btnGroup = setCustomBar();
    let btnRandom = document.createElement("button");
    btnRandom.className = "btn btn-secondary";
    btnRandom.textContent = "Pick again";
    btnRandom.onclick = () => {
        divActivity.lastChild.remove()
        setTopic(random(topics));
    }
    btnGroup.appendChild(btnRandom);
    setTopic(random(topics));
}

function wheelTopic() {
    divActivity.innerHTML = "";
    setCustomBar();
    wheel = new Wheel(topics);
    divWheel.hidden = false;
}

function setTopic(topic) {
    let row = document.createElement("div");
    row.className = "row my-1";
    divActivity.appendChild(row);
    let col = document.createElement("div");
    col.className = "col-auto mx-auto my-2";
    row.appendChild(col);
    let card = document.createElement("div");
    card.className = "card mx-auto";
    card.setAttribute("data-bs-theme", "light");
    col.appendChild(card);
    let cardBody = document.createElement("div");
    cardBody.className = "card-body";
    card.appendChild(cardBody);
    let cardTitle = document.createElement("h1");
    cardTitle.className = "card-title text-center";
    cardTitle.textContent = topic.topicTitle;
    cardBody.appendChild(cardTitle);
    let cardSubtitle = document.createElement("h3");
    cardSubtitle.className = "card-subtitle text-secondary";
    cardBody.appendChild(cardSubtitle);
    let rowBtn = document.createElement("div");
    rowBtn.className = "row";
    cardBody.appendChild(rowBtn);
    let colBtn = document.createElement("div");
    colBtn.className = "col-auto mt-2 mx-auto";
    rowBtn.appendChild(colBtn);
    let btnQuestion = document.createElement("button");
    btnQuestion.className = "btn btn-secondary";
    btnQuestion.innerText = "Question";
    btnQuestion.onclick = () => {
        cardSubtitle.textContent = random(topic.checklist);
    }
    colBtn.appendChild(btnQuestion);
}

function customList() {
    let rowBtn = document.createElement("div");
    rowBtn.className = "row my-2";
    divActivity.appendChild(rowBtn);
    let colBtn = document.createElement("div");
    colBtn.className = "col-auto mx-auto";
    rowBtn.appendChild(colBtn);
    let btnGroup = document.createElement("btnGroup");
    btnGroup.className = "btn-group";
    colBtn.appendChild(btnGroup);
    let btnSelectAll = document.createElement("button");
    btnSelectAll.className = "btn btn-secondary";
    btnSelectAll.innerText = "Select All";
    btnSelectAll.onclick = () => {
        changeCheck(row, true);
    }
    btnGroup.appendChild(btnSelectAll);
    let btnUnselectAll = document.createElement("button");
    btnUnselectAll.className = "btn btn-secondary";
    btnUnselectAll.innerText = "Unselect All";
    btnUnselectAll.onclick = () => {
        changeCheck(row, false);
    }
    btnGroup.appendChild(btnUnselectAll);
    let btnDone = document.createElement("button");
    btnDone.className = "btn btn-secondary";
    btnDone.innerText = "Done";
    btnDone.onclick = () => {
        checklistDone(row);
    }
    btnGroup.appendChild(btnDone);
    let row = document.createElement("div");
    row.className = "row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 row-cols-xxl-6 my-1";
    divActivity.appendChild(row);
    for (const topic of data.topics) {
        let topicTitle = topic.topicTitle;
        let col = document.createElement("div");
        col.className = "col";
        row.appendChild(col);
        let formCheck = document.createElement("div");
        formCheck.className = "form-check";
        col.appendChild(formCheck);
        let checkbox = document.createElement("input");
        checkbox.className = "form-check-input";
        checkbox.type = "checkbox";
        checkbox.value = topicTitle;
        checkbox.checked = isInTopics(topicTitle);
        checkbox.id = "chk" + topicTitle;
        formCheck.appendChild(checkbox);
        let label = document.createElement("label");
        label.className = "form-check-label";
        label.htmlFor = checkbox.id;
        label.innerText = topicTitle;
        formCheck.appendChild(label);
    }
}

function changeCheck (group, checked) {
    for (const element of group.children) {
        let checkbox = element.firstChild.firstChild;
        checkbox.checked = checked;
    }
}

function checklistDone(group) {
    topics = [];
    for (const element of group.children) {
        let checkbox = element.firstChild.firstChild;
        if (checkbox.checked) {
            topics.push(getTopic(checkbox.value));
        }
    }
    if (!topics.length) topics.push(random(data.topics));
    divActivity.innerHTML = "";
    const select = document.getElementById("selActivity");
    setActivity(select.value);
}

function getTopic(topicTitle) {
    for (const topic of data.topics) {
        if (topicTitle == topic.topicTitle) return topic;
    }
}

function isInTopics(topicTitle) {
    for (const topic of topics) {
        if (topicTitle == topic.topicTitle) return true;
    }
    return false;
}

function setCanvas() {
    const row = document.getElementById("wheel")
    let col = document.createElement("div");
    col.className = "col-auto my-1 mx-auto";
    col.id = "divCanvas";
    row.appendChild(col);
    let s = windowHeight - document.querySelector('main').clientHeight;
    if (s > windowWidth * 0.94) s = windowWidth * 0.94
    let canvas = createCanvas(s, s);
    canvas.parent("divCanvas");
    row.hidden = true;
    return row;
}

function mousePressed() {
    if (wheel) {
        if (wheel.text == 'Spin' && !wheel.spinning) {
            wheel.spinWheel();
        }
        if (wheel.picked) {
            setTopic(getTopic(wheel.text));
            divWheel.hidden = true;
            wheel = undefined;
        }
    }
}