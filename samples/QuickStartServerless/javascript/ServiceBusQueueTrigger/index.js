module.exports = async function(context, mySbMsg) {
    context.bindings.signalRMessages = [{
        "target": `datalog-${Object.keys(mySbMsg)}`,
        "arguments": [mySbMsg]
    }]
    context.done();
};