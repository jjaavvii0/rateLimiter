import redis from 'ioredis'

const client = redis.createClient({
    port: process.env.REDIS_PORT || 6379,
    host: process.env.REDIS_HOST || 'localhost',
})

client.on('connect', function () {
    console.log('Connected to REDIS');
});


export default client
