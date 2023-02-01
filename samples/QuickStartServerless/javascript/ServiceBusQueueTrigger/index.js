module.exports = async function(context, mySbMsg) {
    context.bindings.signalRMessages = [{
        "target": `${Object.keys(mySbMsg)}-datalog`,
        "arguments": [mySbMsg]
    }]
    context.done();
};