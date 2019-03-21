checkUtagLoaded(0);
function checkUtagLoaded(loop) {
    if(loop > 20) {
        console.log("Break out");
        return;
    }
    try {
        if(utag !== undefined && utag.gdpr !== undefined) {
            if(utag.gdpr.consent_prompt.isEnabled && utag.gdpr.values.consent && utag.gdpr.values.consent !== "false") {
                preformComponentInfo();
            }
        }
        else {
            setTimeout(function() {
                checkUtagLoaded(loop + 1);
            }, 100);
        }
    } catch (e) {
        setTimeout(function() {
            checkUtagLoaded(loop + 1);
        }, 100);
    }
}
function preformComponentInfo() {
    var postUrl = "https://www.telenor.no/system/componentinfo/";//http://www.telenor.no/system/componentinfo";
    var urlSplit = window.location.href.split("?");
    var returnObj = {
        url: urlSplit[0],
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
        if(returnObj.compNames.length > 0) {
            postData(JSON.stringify(returnObj));
        }
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