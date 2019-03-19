const prometheus = require('prom-client');
const url = require('url');

const globalCounter = new prometheus.Counter({
    name: 'xpf_global_count',
    help: 'Count total times xpf component is used',
    labelNames: ['url', 'domain', 'name', 'version']
});

const componentLocation = new prometheus.Counter({
    name: 'component_location',
    help: 'Count a specific component tracked',
    labelNames: ['url', 'domain', 'name', 'version']
});

module.exports = (data) => {
    data.compNames.forEach(value => {
        for(var i = 0; i < value.count; i++) {
            globalCounter.inc({name: value.name, domain: getFromUrl(data.url, "host"), version: value.version});
            componentLocation.inc({url: getFromUrl(data.url, "path"), domain: getFromUrl(data.url, "host"), name: value.name}, 1);
        }
    });
};

function getFromUrl(urlObj, type) {
    let parsedUrl = "";
    try {
        parsedUrl = url.parse(urlObj);
        parsedUrl = parsedUrl[type];
    } catch (e) {}
    return parsedUrl;
}