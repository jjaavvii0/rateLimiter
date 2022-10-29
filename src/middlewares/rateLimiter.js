import {redisClient, redlock} from "../databases/redis.db"
import {redisValueCreator, responseWhenLimitReached} from "../helpers/limitsHelper" 
import requestIp from 'request-ip'

export const rateLimitCheck = (typeOfLimit) => {
    return async (req, res, next) =>{
        try{
            const nameOfRedisKey =  typeOfLimit=="TOKEN" ? "user:"+req.userId : "ip:"+requestIp.getClientIp(req);
            redisClient.get(nameOfRedisKey, async (err,reply) => {
                if(err) system.exit(0)

                const dataFromReply = JSON.parse(reply)
                await redlock.using(nameOfRedisKey, 1000, async (signal) => {
                    if (signal.aborted) throw signal.error;
                    
                    const newRedisValue = redisValueCreator(dataFromReply, typeOfLimit)
                    if (newRedisValue.limitError) return res.status(429).json(responseWhenLimitReached(typeOfLimit))
                    await redisClient.set(nameOfRedisKey, JSON.stringify(newRedisValue))
                    next();
                });
            })
        }catch(e){
            return res.status(404).json(e);
        }
    }
}