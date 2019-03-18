const prometheus = require('prom-client');

const globalCounter = new prometheus.Counter({
    name: 'xpf_global_count',
    help: 'Count total times xpf component is used',
    labelNames: ['url', 'date', 'name', 'version']
});

const componentLocation = new prometheus.Counter({
    name: 'component_location',
    help: 'Count a specific component tracked',
    labelNames: ['url', 'date', 'name', 'version']
});

module.exports = (data) => {
    data.compNames.forEach(value => {
        for(var i = 0; i < value.count; i++) {
            globalCounter.inc({name: value.name, version: value.version});
            componentLocation.inc({url: data.url, name: value.name}, 1);
        }
    });
};