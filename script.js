function initialize() {
    getData("./ConversationTopics.json").then((data) => {
        document.getElementById("title").innerText = data.activityName;
        document.getElementById("selActivity").onchange = (e) => {
            setActivity(e.target.value, data.topics);
        }
    });
}

async function getData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

function setActivity(activity, data) {
    console.log(data)
    switch (activity) {
        case 'list':
            listTopics(data);
            break;
        case 'random':
            randomTopic(data);
            break;
        case 'wheel':
            wheelTopic(data);
            break;
    }
}

function listTopics(data) {}

function randomTopic(data) {}

function wheelTopic(data) {}

initialize();