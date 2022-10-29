import redis from 'ioredis'
import Redlock from "redlock";


const client = redis.createClient({
    port: process.env.REDIS_PORT || 6379,
    host: process.env.REDIS_HOST || 'localhost',
})

client.on('connect', function () {
    console.log(process.pid + ': Connected to REDIS');
});

const redlock = new Redlock(
    [client],
    {
        driftFactor: 0.01,
        retryCount:  -1,
        retryDelay:  200,
        retryJitter:  200
    }
)
export {client as redisClient, redlock};

