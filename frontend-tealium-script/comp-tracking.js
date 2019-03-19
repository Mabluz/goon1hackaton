setTimeout(function() {
    preformComponentTest();
}, 1000);

//preformComponentTest();
function preformComponentTest() {
    var postUrl = "https://test.telenor.no/system/componentinfo/";//http://www.telenor.no/system/componentinfo";
    var returnObj = {
        url: window.location.href,
        date: new Date(),
        compNames: []
    };
    try {
        var items = document.querySelectorAll("[data-comp-name]");
        for(var i = 0; i < items.length; i++) {
            var obj = {
                name: items[i].getAttribute("data-comp-name"),
                count: 1,
                version: (items[i].getAttribute("data-comp-name").match(/XPF|xpf|Xpf/g) !== null) ? items[i].getAttribute("data-comp-version") : ""
            };
            if(!checkIfAllreadyFound(obj)) {
                returnObj.compNames.push(obj);
            }
        }
        //console.log("items", JSON.stringify(returnObj));
        postData(JSON.stringify(returnObj));
    } catch (e) {
        console.log("Error: ", e)
    }

    function checkIfAllreadyFound(data) {
        for(var i = 0; i < returnObj.compNames.length; i++) {
            if(data.name === returnObj.compNames[i].name) {
                returnObj.compNames[i].count += 1;
                return true;
            }
        }
        return false;
    }

    function postData(payload) {
        payload = encodeURIComponent(payload);
        var xhr = new XMLHttpRequest();
        xhr.open("GET", postUrl+"?t="+payload, true);
        xhr.onload = function() {};
        xhr.send();
    }
}