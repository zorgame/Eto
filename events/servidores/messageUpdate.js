module.exports = async (client,oldM,newM) => {
client.emit("message",newM)
}