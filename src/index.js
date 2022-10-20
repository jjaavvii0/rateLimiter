import app from "./app"
import "./databases/mongo.db"
import "./databases/redis.db"

require('dotenv').config()

const PORT = process.env.PORT || 3000;
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster){
    console.log("Master cluster ONLINE WITH PID: " + process.pid)
    for (var i = 0; i < numCPUs; i++){
        const worker = cluster.fork();
    }
}else{
    app.listen(PORT)
}

cluster.on('online', function(worker, code, signal) {
    console.log("Cluster ONLINE with PID: " + worker.process.pid)
});
cluster.on('exit', function(worker, code, signal){
    console.log('Cluster OFFLINE: %s , restarting ', worker.process.pid);
    cluster.fork();
});



// app.listen(PORT)
// console.log("Server listen on port", PORT)
// console.log(`Process handled by pid: ${processId}`);
