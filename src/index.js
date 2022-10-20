require('dotenv').config()

import app from "./app"
import "./databases/mongo.db"
import "./databases/redis.db"
import cluster from 'cluster'

const numCPUs = require('os').cpus().length;
const PORT = process.env.PORT || 3000;


if (cluster.isPrimary){
    console.log("Master cluster ONLINE WITH PID: " + process.pid)
    for (var i = 0; i < numCPUs; i++){
        cluster.fork();
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